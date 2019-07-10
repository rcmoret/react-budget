import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"

import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Index = (props) => {
  const { dispatch, newMonth } = props
  const monthString = dateFormatter.formatted({ month: newMonth.month, year: newMonth.year, format: "monthYear" })

  return (
    <div className="set-up-workspace">
      <PreviousMonth
        filter="revenue"
        redirect={`/budget/set-up/${newMonth.month}/${newMonth.year}/expenses`}
        title="Revenue Items"
      />
      <Items
        collection={newMonth.collection}
        discretionary={props.discretionary}
        dispatch={dispatch}
        isReady={newMonth.isReady}
        monthString={monthString}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const targetMonth = parseInt(ownProps.match.params.month)
  const targetYear = parseInt(ownProps.match.params.year)
  const newMonth = state.budget.setup.newMonth
  const discretionary = newMonth.collection.reduce((acc, item) => acc += item.amount, 0)

  return {
    newMonth: newMonth,
    discretionary: discretionary,
    baseMonth: state.budget.setup.baseMonth,
    targetMonth: targetMonth,
    targetYear: targetYear,
  }
}

export default connect(mapStateToProps)(Index)
