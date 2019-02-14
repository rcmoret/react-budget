import React from "react"
import { editNewMonthlyItem, toggleMonthlyItemForm } from "../../../actions/budget"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import MonthlyItemForm from "./MonthlyItemForm"

const MonthlyHeader = (props) => {
  const showForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleMonthlyItemForm({ showForm: true }))
  }

  const closeForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleMonthlyItemForm({ showForm: false }))
    props.dispatch(editNewMonthlyItem({ amount: "", budget_category_id: null }))
  }

  const className = props.showForm ? "fa fa-times-circle" : "fa fa-plus-circle"
  return (
    <div className="budget-group-header">
      <div className="title">
        <h3>Monthly Items</h3>
      </div>
      <Link
        to="#"
        onClick={props.showForm ? closeForm : showForm}
        className={className}
      />
      <hr/>
      <MonthlyItemForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { showForm: state.budget.monthly.showForm }
}

export default connect(mapStateToProps)(MonthlyHeader)
