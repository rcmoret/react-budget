import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const WeeklyHeader = () => {
  const showForm = (e) => {
    e.preventDefault()
  }

  return (
    <div className="budget-group-header">
      <div className="title">
        <h3>Weekly Items</h3>
      </div>
      <Link
        to="#"
        onClick={showForm}
        className="fa fa-plus-circle"
      />
      <hr/>
    </div>
  )
}

export default connect((_state, ownProps) => ownProps)(WeeklyHeader)
