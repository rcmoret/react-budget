import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Expenses = ({ newMonth }) => (
  <div className="set-up-workspace">
    <PreviousMonth
      filter="expenses"
      redirect={`/budget/${newMonth.month}/${newMonth.year}`}
      title="Expense Items"
    />
    <Items />
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const newMonth = state.budget.setup.newMonth

  return {
    newMonth: newMonth,
  }
}

export default connect(mapStateToProps)(Expenses)
