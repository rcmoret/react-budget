import React from "react"
import { connect } from "react-redux"

import { Redirect } from "react-router"

const Tab = ({ month, year }) => (
  <Redirect to={`/budget/${month}/${year}`} />
)

const mapStateToProps = (state) => (
  {
    month: state.budget.metadata.month,
    year: state.budget.metadata.year,
  }
)

export default connect(mapStateToProps)(Tab)
