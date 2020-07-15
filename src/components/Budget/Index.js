import React from "react"
import { connect } from "react-redux"

import { categoriesFetched } from "../../actions/budget/categories"
import { itemsFetched as fetched } from "../../actions/budget"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"

import BudgetInfo from "./Info"
import Menu from "./Menu"
import MonthlyItems from "./Items/MonthlyItems"
import WeeklyItems from "./Items/WeeklyItems"

const BudgetIndex = (props) => {
  const {
    apiErrorPresent,
    apiKey,
    categoresWereFetched,
    dispatch,
    isCurrent,
    isFuture,
    itemsFetched,
    metadata,
    month,
    year,
  } = props

  if (!apiErrorPresent && (!itemsFetched || !isCurrent)) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: month, year: year, key: apiKey },
    })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
  }

  if (!apiErrorPresent && (itemsFetched && !categoresWereFetched)) {
    const url = ApiUrlBuilder({ route: "budget-categories-index", query: { key: apiKey } })
    const onSuccess = data => dispatch(categoriesFetched(data))
    get(url, onSuccess)
  }

  return (
    <div className="budget">
      <BudgetInfo />
      <WeeklyItems />
      <MonthlyItems />
      <Menu
        month={month}
        year={year}
        isFuture={isFuture}
        requiresCloseOut={!metadata.is_closed_out}
        requiresSetUp={!metadata.is_set_up}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const month = parseInt(ownProps.match.params.month)
  const year = parseInt(ownProps.match.params.year)
  const isCurrent = state.budget.metadata.month === month && state.budget.metadata.year === year
  const today = new Date()
  const isFuture = (year > today.getFullYear() || (year === today.getFullYear() && month > (today.getMonth() + 1)))
  const categoresWereFetched = state.budget.categories.fetched
  const { apiKey } = state.apiKey
  const apiErrorPresent = state.messages.errors.api.length > 0

  return {
    ...state.budget,
    apiErrorPresent: apiErrorPresent,
    apiKey: apiKey,
    categoresWereFetched: categoresWereFetched,
    isCurrent: isCurrent,
    isFuture: isFuture,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(BudgetIndex)
