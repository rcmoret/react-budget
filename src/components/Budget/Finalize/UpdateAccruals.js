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

export default ({ apiKey, collection, dispatch }) => {
  const submit = ({ id, amount, budget_category_id }) => {
    const url = ApiUrlBuilder({
      route: "budget-item-show",
      id: id,
      budgetCategoryId: budget_category_id,
      query: { key: apiKey }
    })
    const body =  JSON.stringify({ amount: amount })
    const onSuccess = data => dispatch(updateFinalizeItem(data))
    const onFailure = data => console.log({ body: body, data: data })
    put(url, body, onSuccess, onFailure)
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
