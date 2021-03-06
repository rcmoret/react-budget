import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { created } from "../../../actions/transactions"
import { markIntervalClosed } from "../actions/finalize"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import DateFormatter from "../../../functions/DateFormatter"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import { post, put } from "../../../functions/ApiClient"

import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    dispatch,
    month,
    note,
    selectedFromAccountId,
    selectedToAccountId,
    totalExtra,
    year,
  } = props

  if (selectedFromAccountId === null || selectedToAccountId === null) {
    return null
  }

  const dateString = DateFormatter({ month: month, year: year, format: "numericMonthYear" })

  const createFromTransaction = () => {
    const url = ApiUrlBuilder({ route: "transactions-index", accountId: selectedFromAccountId })
    const body = JSON.stringify({
      details_attributes: [{
        amount: totalExtra,
      }],
      description: copy.finalize.depositMessage(dateString),
      notes: note,
    })
    const onSuccess = data => {
      dispatch(created(data))
    }
    const event = EventMessageBuilder({ eventType: "transaction-entry-create" })
    post(url, body, { onSuccess: onSuccess, events: [event] })
  }

  const createToTransaction = (callback) => {
    const url = ApiUrlBuilder({ route: "transactions-index", accountId: selectedToAccountId })
    const body = JSON.stringify({
      details_attributes: [{
        amount: (-1 * totalExtra),
      }],
      description: copy.finalize.depositMessage(dateString),
      budget_exclusion: true,
    })
    const onSuccess = data => {
      dispatch(created(data))
      callback()
    }
    const event = EventMessageBuilder({ eventType: "transaction-entry-create" })
    post(url, body, { events: [event], onSuccess: onSuccess })
  }

  const updateInterval = () => {
    const url = ApiUrlBuilder({ route: "interval-show", month: month, year: year })
    const body = { close_out_completed_at: new Date() }
    const event = EventMessageBuilder({
      eventType: "interval-closed",
      closeOutCompletedAt: body.close_out_completed_at,
      month: month,
      year: year,
    })
    put(url, JSON.stringify(body), { onSuccess: () => dispatch(markIntervalClosed), events: [event] })
  }

  const handleSubmit = () => {
    createFromTransaction()
    createToTransaction(updateInterval)
  }

  return (
    <button
      type="submit"
      onClick={handleSubmit}
      className="deposit-extra"
    >
      {titleize(copy.finalize.depositExtra)}
      {" "}
      <Icon className="fas fa-donate" />
    </button>
  )
}
