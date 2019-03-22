import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import { deleted, update } from "../../../actions/budget/categories"

import Edit from "./Edit"
import Icon from "../../Icons/Icon"

const Show = (props) => {
  const { default_amount, expense, icon_class_name, id, monthly, name, showForm } = props.category

  const revealForm = (e) => {
    e.preventDefault()
    const action = update({ id: id, showForm: true })
    props.dispatch(action)
  }

  const deleteCategory = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(`Are you sure you want to delete ${name}?`)
    if (confirmation) {
      const url = ApiUrlBuilder(["budget", "categories", id])
      fetch(url, { method: "delete" })
        .then(() => props.dispatch(props.dispatch(deleted(id))))
    } else {
      return
    }
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
        <div className="category-delete">
          <Link
            to="#"
            onClick={deleteCategory}
            className="far fa-trash-alt"
          />
        </div>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
