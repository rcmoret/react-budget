import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { editNewMonthlyItem, toggleMonthlyItemForm } from "../../../actions/budget"

import { Link } from "react-router-dom"
import MonthlyItemForm from "./MonthlyItemForm"

const MonthlyHeader = (props) => {
  const {
    items,
  } = copy.item

  const {
    monthly,
  } = copy.category

  const showForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleMonthlyItemForm({ showForm: true }))
  }

  const closeForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleMonthlyItemForm({ showForm: false }))
    props.dispatch(editNewMonthlyItem({
      amount: "",
      budget_category_id: null,
      errors: {},
    }))
  }

  const className = props.showForm ? "fa fa-times-circle" : "fa fa-plus-circle"
  return (
    <div className="budget-group-header">
      <div className="title">
        <h3>{titleize(`${monthly} ${items}`)}</h3>
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
