import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"

import Introduction from "./Introduction"
import Items from "./Items"
import PreviousMonth from "./PreviousMonth"

const Index = (props) => {
  const { baseMonth, dispatch, newMonth, targetMonth, targetYear } = props
  const monthString = dateFormatter.formatted({ month: newMonth.month, year: newMonth.year, format: "monthYear" })
  const baseMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })

  if (!newMonth.isFetched) {
    const url = ApiUrlBuilder(["budget", "items"], { month: targetMonth, year: targetYear })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(newMonthFetched(data)))
  }

  if (newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const url = ApiUrlBuilder(["budget", "items"], { month: month, year: year })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(baseMonthFetched(data)))
  }

  return (
    <div className="set-up-workspace">
      <h2>Set Up {monthString}</h2>
      <p><strong>Based on {baseMonthString}</strong></p>
      <Introduction
        baseMonthString={baseMonthString}
        monthString={monthString}
      />
      <hr />
      <PreviousMonth />
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
