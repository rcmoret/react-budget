import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  setStatus,
  updateFinalizeItem,
} from "../actions/finalize"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import delay from "../../../functions/Delay"
import { put } from "../../../functions/ApiClient"

export default ({ apiKey, collection, dispatch }) => {
  const submit = ({ id, amount, budget_category_id, name, originalAmount, month, year }) => {
    const url = ApiUrlBuilder({
      route: "budget-item-show",
      id: id,
      budgetCategoryId: budget_category_id,
    })
    const event = EventMessageBuilder({
      eventType: "budget-item-update",
      id: id,
      category: name,
      month: month,
      year: year,
      originalAmount: originalAmount,
      newAmount: amount,
    })
    const body = JSON.stringify({ amount: amount })
    put(url, body, { event: event, onSuccess: data => dispatch(updateFinalizeItem(data)) })
  }

  const amountFor = (item) => {
    if (item.baseItem.floatRemaining || item.baseItem.floatRemaining === "") {
      return item.nextItem.amount + ((parseFloat(item.baseItem.floatRemaining) * 100) || 0)
    } else {
      return item.nextItem.amount + item.baseItem.remaining
    }
  }

  const handleSubmit = async () => {
    for (let item of collection) {
      const { id } = item.baseItem
      if (item.nextItem) {
        dispatch(setStatus({ id: id, status: "submitted" }))
        submit({
          id: item.nextItem.id,
          amount: amountFor(item),
          budget_category_id: item.baseItem.budget_category_id,
          name: item.baseItem.name,
          originalAmount: item.nextItem.amount,
          month: item.nextItem.month,
          year: item.nextItem.year,
        })
      }
      await delay(500)
      dispatch(setStatus({ id: id, status: "reviewed" }))
    }
  }

  return (
    <button
      onClick={handleSubmit}
    >
      {titleize(copy.finalize.submitAccrualButtonText)}
    </button>
  )
}
