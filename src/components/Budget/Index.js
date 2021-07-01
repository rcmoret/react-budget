import React from "react"
import { connect } from "react-redux"

import { categoriesFetched } from "../../actions/budget/categories"
import { itemsFetched as fetched } from "../../actions/budget"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"

import AdjustItemForm from "./AdjustItemForm"
import BudgetInfo from "./Info"
import Menu from "./Menu"
import MonthlyItems from "./Items/MonthlyItems"
import WeeklyItems from "./Items/WeeklyItems"

const BudgetIndex = (props) => {
  const {
    isApiUnauthorized,
    categoresWereFetched,
    dispatch,
    isCurrent,
    isFuture,
    itemsFetched,
    metadata,
    month,
    year,
  } = props

  if (!isApiUnauthorized && (!itemsFetched || !isCurrent)) {
    const url = ApiUrlBuilder({
      route: "budget-items-index",
      query: { month: month, year: year },
    })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
  }

  if (!isApiUnauthorized && (itemsFetched && !categoresWereFetched)) {
    const url = ApiUrlBuilder({ route: "budget-categories-index" })
    const onSuccess = data => dispatch(categoriesFetched(data))
    get(url, onSuccess)
  }

  return (
    <div className="budget">
      <BudgetInfo />
      <AdjustItemForm />
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
  const isApiUnauthorized = state.api.status === 401

  return {
    ...state.budget,
    isApiUnauthorized: isApiUnauthorized,
    categoresWereFetched: categoresWereFetched,
    isCurrent: isCurrent,
    isFuture: isFuture,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(BudgetIndex)
