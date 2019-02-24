import React from "react"
import { connect } from "react-redux"

import { Link } from "react-router-dom"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import { update } from "../../../actions/budget/categories"

import Edit from "./Edit"
import Icon from "../../Icons/Icon"

const Show = (props) => {
  const { default_amount, expense, icon_class_name, id, monthly, name, showForm } = props.category

  const revealForm = (e) => {
    e.preventDefault()
    const action = update({ id: id, showForm: true })
    props.dispatch(action)
  }

  if (showForm) {
    return (
      <Edit
        category={props.category}
      />
    )
  } else {
    return (
      <div className="budget-category">
        <div className="category-name">{name}</div>
        <div className="category-default-amount">
          {MoneyFormatter(default_amount, { absoulte: false })}
        </div>
        <div className="category-detail">
          {monthly ? "monthly" : "weekly"}
          {" "}
          {expense ? "expense" : "revenue"}
        </div>
        <div className="category-icon">
          <Icon className={icon_class_name} />
        </div>
        <div className="category-edit">
          <Link
            to="#"
            onClick={revealForm}
            className="far fa-edit"
          />
        </div>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
