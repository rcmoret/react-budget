import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { fromDateString, isToday } from "../../../functions/DateFormatter"
import { get } from "../../../functions/ApiClient"
import { baseMonthFetch, nextMonthFetch } from "../actions/finalize"

import Header from "./Header"
import { Redirect } from "react-router"

const Index = (props) => {
  const {
    isApiUnauthorized,
    baseMonthFetched,
    baseMonthFinalized,
    dispatch,
    isEndOfMonth,
    month,
    nextMonth,
    nextMonthFetched,
    nextYear,
    year,
  } = props

  if (!isEndOfMonth) {
    return (
      <Redirect to={`/budget/${month}/${year}`} />
    )
  }

  if (!isApiUnauthorized && !baseMonthFetched) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: month, year: year },
    })
    const onSuccess = data => dispatch(baseMonthFetch(data))
    get(url, onSuccess)
  }

  if (!isApiUnauthorized && baseMonthFetched && !nextMonthFetched) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: nextMonth, year: nextYear },
    })
    const onSuccess = data => dispatch(nextMonthFetch(data))
    get(url, onSuccess)
  }

  if (!baseMonthFetched || !nextMonthFetched) {
    return (
      <Header
        month={month}
        year={year}
      />
    )
  } else if (baseMonthFinalized) {
    return (
      <Redirect to={`/budget/${nextMonth}/${nextYear}`} />
    )
  } else {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/accruals`} />
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const baseMonth = parseInt(ownProps.match.params.month)
  const baseYear = parseInt(ownProps.match.params.year)
  const { finalize } = state.budget
  const baseMonthFetched = finalize.baseMonth.isFetched
  const nextMonthFetched = finalize.next.isFetched
  const baseMonthFinalized = finalize.baseMonth.is_closed_out
  const { month, year } = finalize.baseMonth
  const nextMonth = (finalize.next.month || (baseMonth === 12 ? 1 : (baseMonth + 1)))
  const nextYear = (finalize.next.year || (baseMonth === 12 ? (baseYear + 1) : baseYear))
  const isEndOfMonth = () => {
    const lastDate = state.budget.metadata.last_date
    if (lastDate === undefined) {
      return false
    } else {
      const formattedDate = fromDateString(lastDate, { format: "dateObject" })
      return isToday(formattedDate)
    }
  }
  const isApiUnauthorized = state.api.status === 401

  return {
    isApiUnauthorized: isApiUnauthorized,
    baseMonthFetched: baseMonthFetched,
    baseMonthFinalized: baseMonthFinalized,
    isEndOfMonth: isEndOfMonth(),
    month: (month || baseMonth),
    nextMonth: nextMonth,
    nextMonthFetched: nextMonthFetched,
    nextYear: nextYear,
    year: (year || baseYear),
  }
}

export default connect(mapStateToProps)(Index)
