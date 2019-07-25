import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { editBaseAmount } from "../actions/finalize"

import DateFormatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Header from "./Header"
import Icon from "../../Icons/Icon"
import { Redirect } from "react-router"
import UpdateButton from "./UpdateAccruals"

const Accruals = (props) => {
  const {
    collection,
    dispatch,
    isFetched,
    month,
    nextMonth,
    nextYear,
    year,
  } = props

  const format = "numericMonthYear"

  if (!isFetched) {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/start`} />
    )
  } else {
    return (
      <div>
        <Header
          month={month}
          year={year}
        />
        <div className="finalize-workspace">
          <h4>{titleize(copy.category.accruals)}</h4>
          <div className="finalize-accrual">
            <div className="item-name">
              {titleize(copy.category.name)}
            </div>
            <div className="item-input">
              {copy.finalize.remainingIn(
                DateFormatter({
                  month: month,
                  year: year,
                  format: format,
                })
              )}
            </div>
            <div className="next-month-amount">
              {copy.finalize.budgetedFor(
                DateFormatter({
                  month: nextMonth,
                  year: nextYear,
                  format: format,
                })
              )}
            </div>
            <div className="next-month-amount">
              {titleize(copy.shared.total)}
            </div>
          </div>
          {collection.map(wrapper =>
            <AccrualItem
              key={wrapper.baseItem.id}
              {...wrapper}
              dispatch={dispatch}
              nextMonth={nextMonth}
              nextYear={nextYear}
            />
          )}
          <div className="next-month-accrual-submit">
            <UpdateButton
              collection={collection}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    )
  }
}

const AccrualItem = (wrapper) => {
  const { baseItem, dispatch } = wrapper
  const { floatRemaining, remaining } = baseItem
  const amount = floatRemaining === undefined ? (remaining / 100.0).toFixed(2) : floatRemaining

  const handleChange = (e) => {
    e.preventDefault()
    const action = editBaseAmount({ id: baseItem.id, floatRemaining: e.target.value })
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

const MissingItem = ({ budgetCategoryId, dispatch, nextMonth, nextYear }) => {
  return (
    <div className="next-month-amount">
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

const mapStateToProps = (state, ownProps) => {
  const baseMonth = parseInt(ownProps.match.params.month)
  const baseYear = parseInt(ownProps.match.params.year)
  const { finalize } = state.budget
  const { isFetched, month, year } = finalize.baseMonth
  const { next } = finalize
  const nextMonthCollection = next.collection
  const collection = state.budget.finalize.baseMonth.collection
    .filter(item => item.accrual && item.remaining < 0)
    .sort((a, b) => a.name <= b.name ? -1 : 1)
    .map(item => {
      return {
        baseItem: item,
        nextItem: nextMonthCollection.find(i => i.budget_category_id === item.budget_category_id),
      }
    })

  return {
    collection: collection,
    isFetched: isFetched,
    month: (month || baseMonth),
    nextMonth: next.month,
    nextYear: next.year,
    year: (year || baseYear),
  }
}

export default connect(mapStateToProps)(Accruals)
