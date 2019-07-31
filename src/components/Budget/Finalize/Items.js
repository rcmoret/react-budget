import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import {
  addFinalizeItem,
  editBaseAmount,
  setStatus,
  updateExtra,
  updateFinalizeItem,
} from "../actions/finalize"
import { addMonthlyItem, addWeeklyItem } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import DateFormatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"
import { post, put } from "../../../functions/ApiClient"

import Header from "./Header"
import Icon from "../../Icons/Icon"
import { Redirect } from "react-router"
import Summary from "./Summary"

const Items = (props) => {
  const {
    dispatch,
    extra,
    isFetched,
    item,
    month,
    nextMonth,
    nextYear,
    year,
  } = props

  if (!isFetched) {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/start`} />
    )
  } else if (!item) {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/finish`} />
    )
  } else {
    const { baseItem } = item
    const { remaining } = baseItem
    const floatRemaining = baseItem.floatRemaining || (remaining / 100.0).toFixed(2)
    const format = "numericMonthYear"
    const baseMonthString = DateFormatter({
      month: month,
      year: year,
      format: format,
    })
    const nextMonthString = DateFormatter({
      month: nextMonth,
      year: nextYear,
      format: format,
    })

    const handleChange = (e) => {
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

    const amount = floatRemaining === undefined ? (remaining / 100.0).toFixed(2) : floatRemaining

    const errors = () => {
      if (Math.abs(parseInt(amount * 100)) > (Math.abs(remaining) + 1)) {
        return ["Cannot be greater than original amount"]
      } else {
        return []
      }
    }

    return (
      <div>
        <Header
          month={month}
          year={year}
        />
        <div className="finalize-wrapper">
          <div className="finalize-workspace">
            <h4>{titleize(copy.finalize.carryOver)}</h4>
            <div className="finalize-carry-over">
              <div className="item-name">
                {item.baseItem.name}
              </div>
              <div className="remaining">
                <div>
                  {copy.finalize.carryOverFrom(baseMonthString)}:
                </div>
                <div>
                  <input
                    className={errors().length > 0 ? "errors" : ""}
                    name="remaining"
                    onChange={handleChange}
                    type="text"
                    value={floatRemaining}
                  />
                  <Errors errors={errors()} />
                </div>
              </div>
              <NextMonthItem
                id={item.baseItem.id}
                budgetCategoryId={item.baseItem.budget_category_id}
                dispatch={dispatch}
                monthly={item.baseItem.monthly}
                name={item.baseItem.name}
                nextItem={item.nextItem}
                nextMonth={nextMonth}
                nextMonthString={nextMonthString}
                nextYear={nextYear}
                remaining={item.baseItem.remaining}
              />
              <Total
                floatRemaining={floatRemaining}
                nextItem={item.nextItem}
              />
              <Submit
                baseItemId={item.baseItem.id}
                dispatch={dispatch}
                floatRemaining={floatRemaining}
                nextItem={item.nextItem}
              />
            </div>
          </div>
          <Summary
            extra={extra}
          />
        </div>
      </div>
    )
  }
}

const NextMonthItem = (props) => {
  const {
    id,
    budgetCategoryId,
    dispatch,
    monthly,
    name,
    nextItem,
    nextMonth,
    nextMonthString,
    nextYear,
    remaining,
  } = props

  if (nextItem) {
    return (
      <div className="budgeted">
        <div>
          {copy.finalize.budgetedFor(nextMonthString)}:
        </div>
        <div className="amount">
          {MoneyFormatter(nextItem.amount, { absolute: false })}
        </div>
      </div>
    )
  } else {
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
      <div className="budgeted">
        <div>
          {copy.finalize.missingItemMessage(name, nextMonthString)}
        </div>
        <div className="buttons">
          <div className="option">
            <button
              className="ignore"
              onClick={ignoreItem}
            >
              {titleize(copy.finalize.disregard)}
              {" "}
              <Icon className="fas fa-times" />
            </button>
          </div>
          <div className="option">
            <button
              className="create-item"
              onClick={createItem}
            >
              {titleize(copy.finalize.createItem)}
              {" "}
              <Icon className="fas fa-check" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const Total = ({ floatRemaining, nextItem }) => {
  if (nextItem) {
    const total = nextItem.amount + (floatRemaining * 100)
    return (
      <div className="total">
        <div>
          {titleize(copy.shared.total)}:
        </div>
        <div>
          {MoneyFormatter(total, { absolute: false })}
        </div>
      </div>
    )
  } else {
    return null
  }
}

const Submit = ({ baseItemId, dispatch, floatRemaining, nextItem }) => {
  if (nextItem) {
    const { id, budget_category_id } = nextItem
    const total = nextItem.amount + (floatRemaining * 100)
    const handleSubmit = () => {
      const url = ApiUrlBuilder(["budget/categories", budget_category_id, "items", id])
      const body = JSON.stringify({ amount: total })
      const onSuccess = (data) => {
        dispatch(updateFinalizeItem(data))
        dispatch(setStatus({ id: baseItemId, status: "reviewed" }))
      }
      put(url, body, onSuccess)
    }

    return (
      <div className="submit-row">
        <button
          className="carry-over-submit"
          onClick={handleSubmit}
          type="submit"
        >
          {titleize(copy.finalize.rollOver)}
          {" "}
          <Icon className="fas fa-check" />
        </button>
      </div>
    )
  } else {
    return null
  }
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

const mapStateToProps = (state, ownProps) => {
  const baseMonth = parseInt(ownProps.match.params.month)
  const baseYear = parseInt(ownProps.match.params.year)
  const { finalize } = state.budget
  const { isFetched, month, year } = finalize.baseMonth
  const { extra, next } = finalize
  const nextMonthCollection = next.collection
  const filterFn = (item) =>  (item.expense && item.remaining < 0) || (!item.expense && item.remaining > 0)
  const collection = state.budget.finalize.baseMonth.collection
    .filter(item => !item.accrual && item.status !== "reviewed")
    .filter(filterFn)
    .sort((a, b) => Math.abs(a.remaining) - Math.abs(b.remaining))
    .map(item => {
      return {
        baseItem: item,
        nextItem: nextMonthCollection.find(i => i.budget_category_id === item.budget_category_id),
      }
    })
  const item = collection[0]

  return {
    collection: collection,
    isFetched: isFetched,
    item: item,
    extra: extra,
    month: (month || baseMonth),
    nextMonth: next.month,
    nextYear: next.year,
    year: (year || baseYear)
  }
}

export default connect(mapStateToProps)(Items)
