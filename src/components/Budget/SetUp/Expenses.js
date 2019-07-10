import React from "react"
import { connect } from "react-redux"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Expenses = ({ month, year }) => (
  <div className="set-up-workspace">
    <PreviousMonth
      filter="expenses"
      redirect={`/budget/set-up/${month}/${year}/finalize`}
      title="Expense Items"
    />
    <Items />
  </div>
)

const mapStateToProps = (state) => {
  const { newMonth } = state.budget.setup

  return { ...newMonth }
}

export default connect(mapStateToProps)(Expenses)
