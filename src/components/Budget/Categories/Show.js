import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { deleted, update } from "../../../actions/budget/categories"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { deleteRequest } from "../../../functions/ApiClient"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Edit from "./Edit"
import ExtraInfo from "./MaturityIntervals/Info"
import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"

const Show = (props) => {
  const {
    deleteConfirmMessage,
    revenue,
    weekly,
  } = copy.category

  const {
    category,
    dispatch,
  } = props

  const {
    id,
    accrual,
    default_amount,
    errors,
    expense,
    icon_class_name,
    monthly,
    name,
    showForm,
  } = category

  const revealForm = (e) => {
    e.preventDefault()
    const action = update({
      id: id,
      errors: (errors || []),
      showForm: true,
    })
    dispatch(action)
  }

  const deleteCategory = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(deleteConfirmMessage(name))
    if (confirmation) {
      const url = ApiUrlBuilder({ route: "budget-category-show", id: id })
      deleteRequest(url, {}, dispatch(deleted(id)))
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
          {monthly ? copy.category.monthly : weekly}
          {" "}
          {expense ? copy.category.expense : revenue}
        </div>
        <div className="category-icon">
          {accrual ? copy.category.accrual : ""}
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
          dispatch={dispatch}
          {...category}
        />
      </div>
    )
  }
}

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Show)
