import React from "react"
import { connect } from "react-redux"

import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"
import { categoriesFetched as fetched } from "../../../actions/budget/categories"

import { getCategories } from "../Categories/graphqlQueries"
import { getItems } from "../Items/graphqlQueries"

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
    const action = (categories) => dispatch(fetched(categories))
    getCategories(result => action(result.data.budgetCategories))
    return null
  }

  if (categoriesFetched && !newMonth.isFetched) {
    const action = (data) => dispatch(newMonthFetched(data))
    getItems({
      month: targetMonth,
      year: targetYear,
      onSuccess: (result) => action(result.data.budgetItems)
    })
    return null
  }

  if (categoriesFetched && newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const action = (data) => dispatch(baseMonthFetched(data))
    getItems({
      month: month,
      year: year,
      onSuccess: (result) => action(result.data.budgetItems)
    })
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
