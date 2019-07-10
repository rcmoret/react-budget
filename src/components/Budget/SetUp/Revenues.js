import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Revenues = ({ newMonth }) => (
  <div className="set-up-workspace">
    <PreviousMonth
      filter="revenue"
      redirect={`/budget/set-up/${newMonth.month}/${newMonth.year}/expenses`}
      title="Revenue Items"
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

export default connect(mapStateToProps)(Revenues)
