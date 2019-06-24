import React from "react"
import { connect } from "react-redux"
import Discretionary from "../Discretionary/Discretionary"
import WeeklyHeader from "./WeeklyHeader"
import WeeklyGroup from "./WeeklyGroup"

const WeeklyItems = (props) => (
  <div className="weekly-items">
    <WeeklyHeader />
    <div className="budget-group">
      <h4>Discretionary</h4>
      <Discretionary />
    </div>
    <WeeklyGroup collection={props.revenues} title="Revenues" />
    <WeeklyGroup collection={props.expenses} title="Expenses" />
  </div>
)

const mapStateToProps = (state) => {
  const { collection } = state.budget.weekly
  const { showAccruals } = state.budget.menuOptions
  const accrualFilter = (item) => !item.accrual || item.matureAccrual || showAccruals

  const sortByAmount = (a, b) => {
    const aDiff = a.amount - a.spent
    const bDiff = b.amount - b.spent
    if (aDiff === bDiff) {
      return 0
    } else if (aDiff > 0 && bDiff > 0) {
      return (bDiff - aDiff)
    } else if (aDiff > 0) {
      return 1
    } else if (bDiff > 0) {
      return -1
    } else {
      return (aDiff - bDiff)
    }
  }

  const sortByName = (a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    } else {
      sortByAmount(a, b)
    }
  }

  const sortOrder = state.budget.menuOptions.sortOrder
  const sortFn = () => {
    switch (sortOrder) {
    case "byAmount":
      return sortByAmount
    case "byName":
      return sortByName
    default:
      return sortByName
    }
  }


  const expenses = collection
    .filter(item => item.expense)
    .filter(accrualFilter)
    .sort(sortFn())

  const revenues = collection
    .filter(item => !item.expense)
    .filter(accrualFilter)
    .sort(sortFn())

  return {
    expenses: expenses,
    revenues: revenues,
  }
}

export default connect(mapStateToProps)(WeeklyItems)
