import React from "react"

import { budget as copy } from "../../../../locales/copy"
import { titleize } from "../../../../locales/functions"

import {
  addFinalizeItem,
  setStatus,
  updateFinalizeItem,
} from "../../actions/finalize"
import { addMonthlyItem, addWeeklyItem } from "../../../../actions/budget"

import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import { post, put } from "../../../../functions/ApiClient"

import Icon from "../../../Icons/Icon"

export default (props) => {
  const {
    amount,
    apiKey,
    baseItemId,
    budgetCategoryId,
    dispatch,
    errors,
    monthly,
    nextItem,
    nextMonth,
    nextYear,
    remaining,
  } = props

  if (errors.length > 0) {
    return null
  }

  const nextAmount = nextItem ? nextItem.amount : 0
  const total = nextAmount + (amount * 100)

  const markReviewed = () => {
    const action = setStatus({
      id: baseItemId,
      status: "reviewed"
    })
    dispatch(action)
  }

  const handleSubmit = () => {
    if (nextItem) {
      updateItem()
    } else if ((amount * 100 === remaining)) {
      markReviewed()
    } else {
      createItem()
    }
  }

  const updateItem = () => {
    const url = ApiUrlBuilder(["budget/categories", budgetCategoryId, "items", nextItem.id], { key: apiKey })
    const body = JSON.stringify({ amount: total })
    const onSuccess = (data) => {
      dispatch(updateFinalizeItem(data))
      markReviewed()
    }
    put(url, body, onSuccess)
  }

  const createItem = () => {
    const url = ApiUrlBuilder(["budget/categories", budgetCategoryId, "items"], { key: apiKey })
    const body = JSON.stringify({
      amount: total,
      month: nextMonth,
      year: nextYear,
    })
    const onSuccess = (data) => {
      if (monthly) {
        dispatch(addMonthlyItem(data))
      } else {
        dispatch(addWeeklyItem(data))
      }
      dispatch(addFinalizeItem(data))
      markReviewed()
    }
    post(url, body, onSuccess)
  }

  return (
    <button
      className="carry-over-submit"
      onClick={handleSubmit}
      type="submit"
    >
      {titleize(copy.finalize.rollOver)}
      {" "}
      <Icon className="fas fa-check" />
    </button>
  )
}
