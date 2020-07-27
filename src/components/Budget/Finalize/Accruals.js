import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import DateFormatter from "../../../functions/DateFormatter"

import Header from "./Header"
import { Redirect } from "react-router"
import Show from "./AccrualShow"
import Summary from "./Summary"
import UpdateButton from "./UpdateAccruals"

const Accruals = (props) => {
  const {
    collection,
    dispatch,
    extra,
    isFetched,
    month,
    nextMonth,
    nextYear,
    year,
  } = props

  const format = "numericMonthYear"
  const reviewCount = collection.filter(item => item.baseItem.status !== "reviewed")

  if (!isFetched) {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/start`} />
    )
  } else if (reviewCount.length > 0) {
    return (
      <div>
        <Header
          month={month}
          year={year}
        />
        <div className="finalize-wrapper">
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
              <div className="indicator"></div>
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
          <Summary
            extra={extra}
          />
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/items`} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const baseMonth = parseInt(ownProps.match.params.month)
  const baseYear = parseInt(ownProps.match.params.year)
  const { finalize } = state.budget
  const { isFetched, month, year } = finalize.baseMonth
  const { extra, next } = finalize
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
    extra: extra,
    month: (month || baseMonth),
    nextMonth: next.month,
    nextYear: next.year,
    year: (year || baseYear),
  }
}

export default connect(mapStateToProps)(Accruals)
