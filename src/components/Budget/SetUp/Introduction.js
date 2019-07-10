import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"
import { categoriesFetched as fetched } from "../../../actions/budget/categories"
import { Redirect } from "react-router"

const Intro = (props) => {
  const {
    baseMonth,
    categoriesFetched,
    newMonth,
    targetMonth,
    targetYear
  } = props

  const { month, year } = newMonth

  if (!categoriesFetched) {
    const url = ApiUrlBuilder(["budget/categories"])
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(fetched(data)))
  }

  if (categoriesFetched && !newMonth.isFetched) {
    const url = ApiUrlBuilder(["budget", "items"], { month: targetMonth, year: targetYear })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(newMonthFetched(data)))
  }

  if (categoriesFetched && newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const url = ApiUrlBuilder(["budget", "items"], { month: month, year: year })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(baseMonthFetched(data)))
  }

  if (!categoriesFetched || !newMonth.isFetched || !baseMonth.isFetched) {
    return null
  } else {
    return (
      <Redirect to={`/budget/set-up/${month}/${year}/revenues`} />
    )
  }
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
