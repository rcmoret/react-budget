import React from "react"
import { connect } from "react-redux"
import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import format, { prevMonth, nextMonth } from "../../shared/Functions/DateFormatter"

const Info = (props) => {
  const { month, year, prev, next } = props
  return (
    <div className="budget-banner">
      <h2>
        {format({ month: month, year: year, format: "monthYear" })}
      </h2>
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

const mapStateToProps = (state, _ownProps) => {
  const { month, year } = state.budget.metadata
  const next = nextMonth({ month: month, year: year })
  const prev = prevMonth({ month: month, year: year })
  return { month: month, year: year, prev: prev, next: next }
}

export default connect(mapStateToProps)(Info)
