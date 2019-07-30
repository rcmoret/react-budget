import React from "react"

import { addFinalizeItem, editBaseAmount, updateExtra } from "../actions/finalize"
import { addMonthlyItem, addWeeklyItem } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import MoneyFormatter from "../../../functions/MoneyFormatter"
import { post } from "../../../functions/ApiClient"

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
    const action = updateExtra({
      id: baseItem.id,
      name: baseItem.name,
      amount: (baseItem.amount - amount)
    })
    dispatch(action)
  }

  const errors = () => {
    if (Math.abs(parseInt(amount * 100)) > (Math.abs(remaining) + 1)) {
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
          name="carryover"
          onChange={handleChange}
          type="text"
          value={amount}
        />
        <Errors errors={errors()} />
      </div>
      <NextMonthItem
        {...wrapper.nextItem}
        budgetCategoryId={wrapper.baseItem.budget_category_id}
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

const Errors = ({ errors }) => {
  if (errors.length === 0) {
    return null
  } else {
    return (
      <ul className="input-errors">
        {errors.map((error, i) =>
          <Error
            key={i}
            error={error}
          />
        )}
      </ul>
    )
  }
}

const Error = ({ error }) => (
  <li className="input-error">
    {error}
  </li>
)

const NextMonthItem = (item) => {
  if (item.id) {
    return (
      <div className="next-month-amount">
        {MoneyFormatter(item.amount, { absolute: false })}
      </div>
    )
  } else {
    return (
      <MissingItem
        budgetCategoryId={item.budgetCategoryId}
        dispatch={item.dispatch}
        monthly={item.monthly}
        nextMonth={item.nextMonth}
        nextYear={item.nextYear}
      />
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

const MissingItem = ({ budgetCategoryId, dispatch, monthly, nextMonth, nextYear }) => {
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
        onClick={createItem}
      >
        Create Item
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

