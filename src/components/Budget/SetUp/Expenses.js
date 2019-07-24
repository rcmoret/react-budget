import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Expenses = ({ month, year }) => (
  <div className="set-up-workspace">
    <PreviousMonth
      filter="expenses"
      redirect={`/budget/set-up/${month}/${year}/finalize`}
      title={titleize(`${copy.category.expense} ${copy.item.items}`)}
    />
    <Items />
  </div>
)

const mapStateToProps = (state) => {
  return state.budget.setup.newMonth
}

export default connect(mapStateToProps)(Expenses)
