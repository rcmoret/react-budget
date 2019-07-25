import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import DateFormatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Header from "./Header"
import Icon from "../../Icons/Icon"
import { Redirect } from "react-router"
import Show from "./AccrualShow"
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
      <div className="finalize-wrapper">
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
            <Show
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
