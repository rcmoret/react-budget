import React from "react"

import { budget as copy } from "../../../../locales/copy"
import { titleize } from "../../../../locales/functions"

import {
  addFinalizeItem,
  setStatus,
  updateFinalizeItem,
} from "../../actions/finalize"
import { addMonthlyItem, addWeeklyItem } from "../../../../actions/budget"
import { decimalToInt } from "../../../../functions/MoneyFormatter"

import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import EventMessageBuilder from "../../../../functions/EventMessageBuilder"
import { post } from "../../../../functions/ApiClient"

import Icon from "../../../Icons/Icon"

export default (props) => {
  const {
    amount,
    baseItem,
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
      id: baseItem.id,
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
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })
    const adjustedTotal =  decimalToInt(amount) + nextItem.amount
    const body = JSON.stringify(
      {
        events: [
          {
            event_type: "rollover_item_adjust",
            budget_item_id: nextItem.id,
            amount: adjustedTotal,
          }
        ]
      }
    )
    const event = EventMessageBuilder({
      eventType: "budget-item-update",
      id: nextItem.id,
      category: nextItem.name,
      month: nextItem.month,
      year: nextItem.year,
      originalAmount: nextItem.originalAmount,
      newAmount: amount,
    })
    const onSuccess = (data) => {
      dispatch(updateFinalizeItem(data[0].item))
      markReviewed()
    }
    post(url, body, { event: event, onSuccess: onSuccess })
  }

  const createItem = () => {
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })
    const body = JSON.stringify({
      events: [
        {
          event_type: "rollover_item_create",
          amount: total,
          budget_category_id: budgetCategoryId,
          month: nextMonth,
          year: nextYear,
        }
      ]
    })
    const onSuccess = (data) => {
      if (monthly) {
        dispatch(addMonthlyItem(data[0].item))
      } else {
        dispatch(addWeeklyItem(data[0].item))
      }
      dispatch(addFinalizeItem(data[0].item))
      markReviewed()
    }
    const event = data => EventMessageBuilder({ eventType: "budget-item-create" })(data[0])
    post(url, body, { onSuccess: onSuccess, event: event })
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
