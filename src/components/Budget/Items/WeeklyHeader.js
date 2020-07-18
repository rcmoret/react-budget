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
      budget_category_id: null,
      errors: [],
    }))
  }

  const iconClassName = props.showForm ? "fa fa-times-circle" : "fa fa-plus-circle"
  const divClassName = `budget-group-header ${props.showForm ? "" : "underlined"}`
  return (
    <div className={divClassName}>
      <div className="title">
        <h3>{titleize(`${copy.category.weekly} ${copy.item.items}`)}</h3>
      </div>
      <Link
        to="#"
        onClick={props.showForm ? closeForm : showForm}
        className={iconClassName}
      />
      <WeeklyItemForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { showForm: state.budget.weekly.showForm }
}

export default connect(mapStateToProps)(WeeklyHeader)
