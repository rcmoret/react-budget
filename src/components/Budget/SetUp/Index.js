import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"

const Index = (props) => {
  const { baseMonth, newMonth, targetMonth, targetYear } = props
  const monthString = dateFormatter.formatted({ month: newMonth.month, year: newMonth.year, format: 'monthYear' })
  const baseMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: 'monthYear' })

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
      <p>Based on {baseMonthString}</p>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const targetMonth = parseInt(ownProps.match.params.month)
  const targetYear = parseInt(ownProps.match.params.year)

  return {
    newMonth: state.budget.setup.newMonth,
    baseMonth: state.budget.setup.baseMonth,
    targetMonth: targetMonth,
    targetYear: targetYear,
  }
}

export default connect(mapStateToProps)(Index)
