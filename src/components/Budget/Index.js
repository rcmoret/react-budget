import React from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { itemsFetched } from "../../actions/budget"

import BudgetInfo from "./Info"
import Menu from "./Menu"
import MonthlyItems from "./Items/MonthlyItems"
import WeeklyItems from "./Items/WeeklyItems"

const BudgetIndex = (props) => {
  if (!props.itemsFetched || !props.isCurrent) {
    const { month, year } = props
    const url = ApiUrlBuilder(["budget/items"], { month: month, year: year })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(itemsFetched(data)))
  }

  return (
    <div className="budget">
      <BudgetInfo />
      <WeeklyItems />
      <MonthlyItems />
      <Menu
        month={props.month}
        year={props.year}
        isFuture={props.isFuture}
        requiresSetUp={!props.metadata.is_set_up}
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

  return {
    ...state.budget,
    isCurrent: isCurrent,
    month: month,
    year: year,
    isFuture: isFuture
  }
}

export default connect(mapStateToProps)(BudgetIndex)
