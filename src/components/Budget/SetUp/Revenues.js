import React from "react"
import { connect } from "react-redux"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Revenues = ({ month, year }) => (
  <div className="set-up-workspace">
    <PreviousMonth
      filter="revenue"
      redirect={`/budget/set-up/${month}/${year}/expenses`}
      title="Revenue Items"
    />
    <Items />
  </div>
)

const mapStateToProps = (state) => {
  const { newMonth } = state.budget.setup

  return { ...newMonth }
}

export default connect(mapStateToProps)(Revenues)
