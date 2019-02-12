import React from "react"
import { connect } from "react-redux"
import MonthlyGroup from "./MonthlyGroup"

const MonthlyItems = (props) => {
  const { collection } = props
  const revenues = collection.filter(item => !item.expense)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))
  const expenses = collection.filter(item => item.expense)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))

  return(
    <div className="monthly-items">
      <h3>Monthly Items</h3>
      <hr/>
      <MonthlyGroup collection={revenues} title="Revenues" />
      <MonthlyGroup collection={expenses} title="Expenses" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { collection: state.budget.monthly }
}

export default connect(mapStateToProps)(MonthlyItems)
