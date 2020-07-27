import React from "react"
import { connect } from "react-redux"

import Header from "./Header"
import MonthlyItem from "./MonthlyItem"
import { Redirect } from "react-router"
import Summary from "./Summary"
import WeeklyItem from "./WeeklyItem"

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
    return (
      <div>
        <Header
          month={month}
          year={year}
        />
        <div className="finalize-wrapper">
          <Item
            item={item}
            dispatch={dispatch}
            month={month}
            nextMonth={nextMonth}
            nextYear={nextYear}
            year={year}
          />
          <Summary
            extra={extra}
          />
        </div>
      </div>
    )
  }
}

const Item = (props) => {
  if (props.item.baseItem.monthly) {
    return (
      <MonthlyItem
        {...props}
      />
    )
  } else {
    return (
      <WeeklyItem
        {...props}
      />
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
  const filterFn = (item) =>  (item.expense && item.remaining < 0) || (!item.expense && item.remaining > 0)
  const collection = state.budget.finalize.baseMonth.collection
    .filter(item => !item.accrual && item.status !== "reviewed")
    .filter(filterFn)
    .sort((a, b) => Math.abs(a.remaining) - Math.abs(b.remaining))
    .map(item => {
      return {
        baseItem: item,
        nextItems: nextMonthCollection.filter(i => i.budget_category_id === item.budget_category_id),
      }
    })
  const item = collection[0]

  return {
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
