import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
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
    props.dispatch(editNewWeeklyItem({
      amount: "",
      budgetCategoryId: null,
      errors: {},
    }))
  }

  const className = props.showForm ? "fa fa-times-circle" : "fa fa-plus-circle"
  return (
    <div className="budget-group-header">
      <div className="title">
        <h3>{titleize(`${copy.category.weekly} ${copy.item.items}`)}</h3>
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
