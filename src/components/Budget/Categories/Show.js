import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { deleted, update } from "../../../actions/budget/categories"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import Edit from "./Edit"
import ExtraInfo from "./MaturityInfo"
import Icon from "../../Icons/Icon"

const Show = (props) => {
  const {
    category,
    dispatch,
  } = props

  const {
    id,
    accrual,
    default_amount,
    expense,
    icon_class_name,
    maturityIntervals,
    maturityIntervalsFetched,
    monthly,
    name,
    showForm,
    showMaturityIntervals,
  } = category

  const revealForm = (e) => {
    e.preventDefault()
    const action = update({ id: id, showForm: true })
    dispatch(action)
  }

  const deleteCategory = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(`Are you sure you want to delete ${name}?`)
    if (confirmation) {
      const url = ApiUrlBuilder(["budget", "categories", id])
      fetch(url, { method: "delete" })
        .then(() => dispatch(deleted(id)))
    } else {
      return
    }
  }

  if (showForm) {
    return (
      <Edit
        category={category}
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
          {monthly ? "monthly" : "day-to-day"}
          {" "}
          {expense ? "expense" : "revenue"}
        </div>
        <div className="category-icon">
          {accrual ? "accrual" : ""}
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
        <ExtraInfo
          id={id}
          accrual={accrual}
          dispatch={dispatch}
          maturityIntervals={maturityIntervals}
          maturityIntervalsFetched={maturityIntervalsFetched}
          showMaturityIntervals={showMaturityIntervals}
        />
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
