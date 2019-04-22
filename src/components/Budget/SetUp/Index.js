import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"

const Index = ({ month, year }) => {
  const monthString = dateFormatter.formatted({ month: month, year: year, format: 'monthYear' })
  return (
    <div className="set-up-workspace">
      <h2>Set Up {monthString}</h2>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    month: state.budget.metadata.month,
    year: state.budget.metadata.year,
  }
}

export default connect(mapStateToProps)(Index)
