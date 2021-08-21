import React from "react"
import { connect } from "react-redux"

import format, { fromDateString, prevMonth, nextMonth } from "../../functions/DateFormatter"
import { transaction as copy } from "../../locales/copy"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"

const Info = (props) => {
  const { daysRemaining, endDate, month, startDate, year, prev, next, totalDays } = props
  return (
    <div className="budget-banner">
      <h2>
        {format({ month: month, year: year, format: "monthYear" })}
      </h2>
      <div className="budget-links">
        {copy.dateRange(startDate, endDate)}
      </div>
      <div className="budget-links">
        Total Days: {totalDays}; Days Remaining: {daysRemaining}
      </div>
      <div className="budget-links">
        <Link to={`/budget/${prev.month}/${prev.year}`}>
          <Icon className="fas fa-angle-double-left" />
          {" "}
          {format({ ...prev, format: "numericMonthYear"})}
        </Link>
        <Link to={`/budget/${next.month}/${next.year}`}>
          {format({ ...next, format: "numericMonthYear"})}
          {" "}
          <Icon className="fas fa-angle-double-right" />
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { days_remaining, first_date, last_date, total_days, month, year } = state.budget.metadata
  const next = nextMonth({ month: month, year: year })
  const prev = prevMonth({ month: month, year: year })
  const startDate = first_date === undefined ? "" : fromDateString(first_date)
  const endDate = last_date === undefined ? "" : fromDateString(last_date)
  // const endDate = "" // fromDateString(last_date)

  return {
    daysRemaining: days_remaining,
    endDate: endDate,
    month: month,
    next: next,
    prev: prev,
    startDate: startDate,
    totalDays: total_days,
    year: year,
  }
}

export default connect(mapStateToProps)(Info)
