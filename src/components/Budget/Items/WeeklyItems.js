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
  const expenses = collection.filter(item => item.expense)
    .sort((a, b) => {
      if (a.difference === b.difference) {
        return 0
      } else if (a.difference > 0 && b.difference > 0) {
        return (b.difference - a.difference)
      } else if (a.difference > 0) {
        return 1
      } else if (b.difference > 0) {
        return -1
      } else {
        return (a.difference - b.difference)
      }
    })
  const revenues = collection.filter(item => !item.expense)
    .sort((a, b) => {
      if (a.difference === b.difference) {
        return 0
      } else if (a.difference < 0 && b.difference < 0) {
        return (a.difference - b.difference)
      } else if (a.difference < 0) {
        return 1
      } else if (b.difference < 0) {
        return -1
      } else {
        return (b.difference - a.difference)
      }
    })

  return {
    expenses: expenses,
    revenues: revenues,
  }
}

export default connect(mapStateToProps)(WeeklyItems)
