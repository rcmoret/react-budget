import React from "react"
import { connect } from "react-redux"

import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"
import { categoriesFetched as fetched } from "../../../actions/budget/categories"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/RestApiClient"

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
    get(url, data => dispatch(fetched(data)))
    return null
  }

  if (categoriesFetched && !newMonth.isFetched) {
    const url = ApiUrlBuilder(["budget/items"], { month: targetMonth, year: targetYear })
    get(url, data => dispatch(newMonthFetched(data)))
    return null
  }

  if (categoriesFetched && newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const url = ApiUrlBuilder(["budget/items"], { month: month, year: year })
    get(url, data => dispatch(baseMonthFetched(data)))
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
  const collection = newMonth.collection.sort((a, b) => {
    if (a.expense && !b.expense) {
      return 1
    } else if (!a.expense && !b.expense) {
      return a.amount <= b.amount ? 1 : -1
    } else if (a.expense && b.expense) {
      return a.amount >= b.amount ? 1 : -1
    } else { /* a is revenue && b.expense */
      return -1
    }
  })

  return {
    baseMonth: state.budget.setup.baseMonth,
    categoriesFetched: state.budget.categories.fetched,
    collection: collection,
    newMonth: newMonth,
    targetMonth: targetMonth,
    targetYear: targetYear,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Intro)
