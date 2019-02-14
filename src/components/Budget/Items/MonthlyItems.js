import React from "react"
import { connect } from "react-redux"
import MonthlyGroup from "./MonthlyGroup"

const MonthlyItems = (props) => (
  <div className="monthly-items">
    <h3>Monthly Items</h3>
    <hr/>
    <MonthlyGroup collection={props.revenues} title="Revenues" />
    <MonthlyGroup collection={props.expenses} title="Expenses" />
  </div>
)

const mapStateToProps = (state) => {
  const collection = state.budget.monthly
  return {
    revenues: collection.filter(item => !item.expense)
      .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount))),
    expenses: collection.filter(item => item.expense)
      .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount))),
  }
}

export default connect(mapStateToProps)(MonthlyItems)
