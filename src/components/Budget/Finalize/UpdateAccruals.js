import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  setStatus,
  updateFinalizeItem,
} from "../actions/finalize"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import delay from "../../../functions/Delay"
import { put } from "../../../functions/RestApiClient"

export default ({ collection, dispatch }) => {
  const submit = ({ id, amount, budgetCategoryId }) => {
    put(
      ApiUrlBuilder(["budget/categories", budgetCategoryId, "items", id]),
      JSON.stringify({ amount: amount }),
      (data) => dispatch(updateFinalizeItem(data))
    )
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
          budgetCategoryId: item.baseItem.budgetCategoryId,
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
