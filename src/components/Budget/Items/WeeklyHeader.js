import React from "react"
import { connect } from "react-redux"
import { editNewWeeklyItem, toggleWeeklyItemForm } from "../../../actions/budget"
import { Link } from "react-router-dom"
import WeeklyItemForm from "./WeeklyItemForm"

const WeeklyHeader = (props) => {
  const showForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleWeeklyItemForm({ showForm: true }))
  }

  const closeForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleWeeklyItemForm({ showForm: false }))
    props.dispatch(editNewWeeklyItem({ amount: "", budget_category_id: null }))
  }

  const className = props.showForm ? "fa fa-times-circle" : "fa fa-plus-circle"
  return (
    <div className="budget-group-header">
      <div className="title">
        <h3>Weekly Items</h3>
      </div>
      <Link
        to="#"
        onClick={props.showForm ? closeForm : showForm}
        className={className}
      />
      <hr/>
      <WeeklyItemForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { showForm: state.budget.weekly.showForm }
}

export default connect(mapStateToProps)(WeeklyHeader)
