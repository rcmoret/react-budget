import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { created } from "../../../actions/transactions"
import { markIntervalClosed } from "../actions/finalize"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import DateFormatter from "../../../functions/DateFormatter"
import { post, put } from "../../../functions/ApiClient"

import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    apiKey,
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
    const url = ApiUrlBuilder(["accounts", selectedFromAccountId, "transactions"], { key: apiKey })
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
    const onFailure = data => console.log({ body: body, data: data })
    post(url, body, onSuccess, onFailure)
  }

  const createToTransaction = (callback) => {
    const url = ApiUrlBuilder(["accounts", selectedToAccountId, "transactions"], { key: apiKey })
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
    const onFailure = data => console.log({ body: body, data: data })
    post(url, body, onSuccess, onFailure)
  }

  const updateInterval = () => {
    const url = ApiUrlBuilder(["intervals", month, year], { key: apiKey })
    const body = JSON.stringify({ close_out_completed_at: new Date() })
    const onSuccess = () => dispatch(markIntervalClosed)
    put(url, body, onSuccess)
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
