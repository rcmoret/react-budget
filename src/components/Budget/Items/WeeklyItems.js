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
  return {
    expenses: collection.filter(item => item.expense)
      .sort((a, b) => (Math.abs(b.remaining) - Math.abs(a.remaining))),
     revenues: collection.filter(item => !item.expense)
      .sort((a, b) => (Math.abs(b.remaining) - Math.abs(a.remaining))),
  }
}

export default connect(mapStateToProps)(WeeklyItems)
