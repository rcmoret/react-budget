import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  setStatus,
  updateFinalizeItem,
} from "../actions/finalize"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import delay from "../../../functions/Delay"
import { put } from "../../../functions/ApiClient"

export default ({ collection, dispatch }) => {
  const submit = ({ id, amount, budget_category_id }) => {
    put(
      ApiUrlBuilder(["budget/categories", budget_category_id, "items", id]),
      JSON.stringify({ amount: amount }),
      (data) => dispatch(updateFinalizeItem(data))
    )
  }

  const amountFor = (item) => {
    if (item.baseItem.floatRemaining) {
      return item.nextItem.amount + parseInt(item.baseItem.floatRemaining * 100)
    } else {
      return item.nextItem.amount + item.baseItem.remaining
    }
  }

  const handleSubmit = async () => {
    for (let item of collection) {
      const { id } = item.baseItem
      dispatch(setStatus({ id: id, status: "submitted" }))
      if (item.nextItem) {
        submit({
          id: item.nextItem.id,
          amount: amountFor(item),
          budget_category_id: item.baseItem.budget_category_id,
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
