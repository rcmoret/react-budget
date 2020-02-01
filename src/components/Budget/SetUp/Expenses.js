import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

import { Redirect } from "react-router"

const Expenses = ({ paramMonth, paramYear, isFetched, month, year }) => {
  if (isFetched) {
    return (
      <div className="set-up-workspace">
        <PreviousMonth
          filter="expenses"
          redirect={`/budget/set-up/${month}/${year}/finalize`}
          title={titleize(`${copy.category.expense} ${copy.item.items}`)}
        />
        <Items />
      </div>
    )
  } else {
    return (
      <Redirect to={`/budget/set-up/${paramMonth}/${paramYear}/intro`} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const paramMonth = parseInt(ownProps.match.params.month)
  const paramYear = parseInt(ownProps.match.params.year)
  const { isFetched } = state.budget.setup.baseMonth

  return {
    paramMonth: paramMonth,
    paramYear: paramYear,
    isFetched: isFetched,
    ...state.budget.setup.newMonth
  }
}

export default connect(mapStateToProps)(Expenses)
