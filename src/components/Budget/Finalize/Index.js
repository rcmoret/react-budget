import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { isToday } from "../../../functions/DateFormatter"
import { get } from "../../../functions/ApiClient"
import { baseMonthFetch, nextMonthFetch } from "../actions/finalize"

import Header from "./Header"
import { Redirect } from "react-router"

const Index = (props) => {
  const {
    apiErrorPresent,
    apiKey,
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

  if (!apiErrorPresent && !baseMonthFetched) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: month, year: year, key: apiKey },
    })
    const onSuccess = data => dispatch(baseMonthFetch(data))
    get(url, onSuccess)
  }

  if (!apiErrorPresent && baseMonthFetched && !nextMonthFetched) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: nextMonth, year: nextYear, key: apiKey },
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
  const isEndOfMonth = isToday(new Date((year || baseYear), (month || baseMonth), 0))
  const { apiKey } = state.apiKey
  const apiErrorPresent = state.messages.errors.api.length > 0

  return {
    apiErrorPresent: apiErrorPresent,
    apiKey: apiKey,
    baseMonthFetched: baseMonthFetched,
    baseMonthFinalized: baseMonthFinalized,
    isEndOfMonth: isEndOfMonth,
    month: (month || baseMonth),
    nextMonth: nextMonth,
    nextMonthFetched: nextMonthFetched,
    nextYear: nextYear,
    year: (year || baseYear),
  }
}

export default connect(mapStateToProps)(Index)
