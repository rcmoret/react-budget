import React from "react"
import { connect } from "react-redux"

import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"
import { categoriesFetched as fetched } from "../../../actions/budget/categories"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"

import { Redirect } from "react-router"

const Intro = (props) => {
  const {
    isApiUnauthorized,
    baseMonth,
    categoriesFetched,
    dispatch,
    newMonth,
    targetMonth,
    targetYear
  } = props

  const { month, year } = newMonth

  if (isApiUnauthorized) {
    return null
  }

  if (!categoriesFetched) {
    const url = ApiUrlBuilder({ route: "budget-categories-index" })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
    return null
  }

  if (categoriesFetched && !newMonth.isFetched) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: targetMonth, year: targetYear },
    })
    const onSuccess = data => dispatch(newMonthFetched(data))
    get(url, onSuccess)
    return null
  }

  if (categoriesFetched && newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: month, year: year  },
    })
    const onSuccess = data => dispatch(baseMonthFetched(data))
    get(url, onSuccess)
    return null
  }

  return (
    <Redirect to={`/budget/set-up/${month}/${year}/revenues`} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const targetMonth = parseInt(ownProps.match.params.month)
  const targetYear = parseInt(ownProps.match.params.year)
  const newMonth = state.budget.setup.newMonth
  const isApiUnauthorized = state.api.status === 401

  return {
    isApiUnauthorized: isApiUnauthorized,
    baseMonth: state.budget.setup.baseMonth,
    categoriesFetched: state.budget.categories.fetched,
    newMonth: newMonth,
    targetMonth: targetMonth,
    targetYear: targetYear,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Intro)
