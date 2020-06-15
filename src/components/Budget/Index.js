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

  if (!itemsFetched || !isCurrent) {
    const url = ApiUrlBuilder(["budget/items"], { month: month, year: year, key: apiKey })
    const onSuccess = data => dispatch(fetched(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
  }

  if (itemsFetched && !categoresWereFetched) {
    const url = ApiUrlBuilder(["budget/categories"], { key: apiKey })
    get(url, data => dispatch(categoriesFetched(data)))
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

  return {
    ...state.budget,
    apiKey: apiKey,
    categoresWereFetched: categoresWereFetched,
    isCurrent: isCurrent,
    isFuture: isFuture,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(BudgetIndex)
