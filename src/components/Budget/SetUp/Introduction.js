import React from "react"
import { connect } from "react-redux"

import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"
import { categoriesFetched as fetched } from "../../../actions/budget/categories"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"

import { Redirect } from "react-router"

const Intro = (props) => {
  const {
    baseMonth,
    categoriesFetched,
    dispatch,
    newMonth,
    targetMonth,
    targetYear
  } = props

  const { month, year } = newMonth

  if (!categoriesFetched) {
    const url = ApiUrlBuilder(["budget/categories"])
    const onSuccess = data => dispatch(fetched(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
    return null
  }

  if (categoriesFetched && !newMonth.isFetched) {
    const url = ApiUrlBuilder(["budget/items"], { month: targetMonth, year: targetYear })
    const onSuccess = data => dispatch(newMonthFetched(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
    return null
  }

  if (categoriesFetched && newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const url = ApiUrlBuilder(["budget/items"], { month: month, year: year })
    const onSuccess = data => dispatch(baseMonthFetched(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
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

  return {
    baseMonth: state.budget.setup.baseMonth,
    categoriesFetched: state.budget.categories.fetched,
    newMonth: newMonth,
    targetMonth: targetMonth,
    targetYear: targetYear,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Intro)
