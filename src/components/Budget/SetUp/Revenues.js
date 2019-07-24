import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Revenues = ({ month, year }) => (
  <div className="set-up-workspace">
    <PreviousMonth
      filter="revenue"
      redirect={`/budget/set-up/${month}/${year}/accruals`}
      title={titleize(`${copy.category.revenue} ${copy.item.items}`)}
    />
    <Items />
  </div>
)

const mapStateToProps = (state) => {
  return state.budget.setup.newMonth
}

export default connect(mapStateToProps)(Revenues)
