import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { addFinalizeItem, editBaseAmount, setStatus, updateExtra } from "../actions/finalize"
import { addMonthlyItem, addWeeklyItem } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import MoneyFormatter from "../../../functions/MoneyFormatter"
import { post } from "../../../functions/RestApiClient"

import Errors from "../../Errors/Errors"
import Icon from "../../Icons/Icon"

export default (wrapper) => {
  const { baseItem, dispatch } = wrapper
  const { floatRemaining, remaining } = baseItem
  const amount = floatRemaining === undefined ? (remaining / 100.0).toFixed(2) : floatRemaining

  const handleChange = (e) => {
    e.preventDefault()
    const action = editBaseAmount({
      ...baseItem,
      floatRemaining: e.target.value
    })
    dispatch(action)
    _updateExtra(parseFloat(e.target.value * 100))
  }

  const _updateExtra = (amount) => {
    const applied = remaining - amount > -100 ? 0 : remaining - amount
    const action = updateExtra({
      id: baseItem.id,
      name: baseItem.name,
      amount: applied
    })
    dispatch(action)
  }

  const errors = () => {
    if (Math.abs(parseInt(amount * 100)) > (Math.abs(remaining) + 100)) {
      return ["Cannot be greater than original amount"]
    } else {
      return []
    }
  }

  return (
    <div className="finalize-accrual">
      <div className="item-name">
        {wrapper.baseItem.name}
      </div>
      <div className="item-input">
        <input
          className={errors().length > 0 ? "errors" : ""}
          disabled={wrapper.baseItem.status !== "pending"}
          name="carryover"
          onChange={handleChange}
          type="text"
          value={amount}
        />
        <Errors errors={errors()} />
      </div>
      <NextMonthItem
        {...wrapper.nextItem}
        baseItem={wrapper.baseItem}
        dispatch={wrapper.dispatch}
        nextMonth={wrapper.nextMonth}
        nextYear={wrapper.nextYear}
      />
      <Total
        nextMonth={wrapper.nextItem}
        remaining={parseInt(amount * 100)}
      />
      <Indicator status={wrapper.baseItem.status} />
    </div>
  )
}

const NextMonthItem = (props) => {
  const {
    id,
    amount,
    baseItem,
    dispatch,
    nextMonth,
    nextYear,
  } = props

  if (id) {
    return (
      <div className="next-month-amount">
        {MoneyFormatter(amount, { absolute: false })}
      </div>
    )
  } else if (baseItem.status !== "reviewed") {
    return (
      <MissingItem
        {...baseItem}
        dispatch={dispatch}
        nextMonth={nextMonth}
        nextYear={nextYear}
      />
    )
  } else {
    return (
      <div className="next-month-amount">
      </div>
    )
  }
}

const Total = ({ nextMonth, remaining }) => {
  const total = nextMonth ? (remaining + nextMonth.amount) : 0
  return (
    <div className="next-month-amount">
      {MoneyFormatter(total, { absolute: false })}
    </div>
  )
}

const MissingItem = (props) => {
  const {
    id,
    budgetCategoryId,
    dispatch,
    monthly,
    name,
    nextMonth,
    nextYear,
    remaining,
  } = props

  const ignoreItem = () => {
    const action = updateExtra({
      id: id,
      name: name,
      amount: remaining,
    })
    dispatch(action)
    dispatch(setStatus({ id: id, status: "reviewed" }))
  }

  const createItem = () => {
    const url = ApiUrlBuilder(["budget/categories", budgetCategoryId, "items"])
    const body = JSON.stringify({
      amount: 0,
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
    }
    post(url, body, onSuccess)
  }

  return (
    <div className="next-month-amount">
      <button
        className="ignore"
        onClick={ignoreItem}
      >
        {titleize(copy.finalize.disregard)}
        {" "}
        <span className="fas fa-times"></span>
      </button>
      <button
        className="create-item"
        onClick={createItem}
      >
        {titleize(copy.finalize.createItem)}
        {" "}
        <span className="fas fa-check"></span>
      </button>
    </div>
  )
}

const Indicator = ({ status }) => {
  const klass = () => {
    switch(status) {
    case "pending":
      return "far fa-check-circle"
    case "submitted":
      return "fas fa-compact-disc fa-spin"
    case "reviewed":
      return "fas fa-check-circle green"
    default:
      return "far fa-check-circle"
    }
  }

  return (
    <div className="indicator">
      <Icon className={klass()} />
    </div>
  )
}
