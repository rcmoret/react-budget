import React from "react"
import { connect } from "react-redux"
import Discretionary from "../Discretionary/Discretionary"
import WeeklyHeader from "./WeeklyHeader"
import WeeklyGroup from "./WeeklyGroup"

const WeeklyItems = (props) => {
  const { collection } = props
  const expenses = collection.filter(item => item.expense)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))
  const revenues = collection.filter(item => !item.expense)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))

  return(
    <div className="weekly-items">
      <WeeklyHeader />
      <div className="budget-group">
        <h4>Discretionary</h4>
        <Discretionary />
      </div>
      <WeeklyGroup collection={revenues} title="Revenues" />
      <WeeklyGroup collection={expenses} title="Expenses" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { collection: state.budget.weekly }
}

export default connect(mapStateToProps)(WeeklyItems)
