import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { deleted, update } from "../../../actions/budget/categories"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { deleteRequest } from "../../../functions/ApiClient"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Edit from "./Edit"
import ExtraInfo from "./MaturityIntervals/Info"
import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"

const Row = (props) => {
  const {
    cancelButtonText,
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
    slug,
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
      const event = EventMessageBuilder({
        eventType: "budget-category-delete",
        id: id,
        name: name,
      })
      deleteRequest(url, event, dispatch(deleted(id)))
    }
  }

  if (showForm) {
    return (
      <Edit
        category={{...category, errors: (category.errors || [])}}
        cancelLabel={cancelButtonText}
      />
    )
  } else {
    return (
      <div className="budget-category">
        <div className="category-name underline">
          <Link to={`/budget/categories/${slug}`}>
            {name}
          </Link>
        </div>
        <div className="category-slug italic">{slug}</div>
        <div className="category-default-amount">
          {MoneyFormatter(default_amount, { absoulte: false })}
        </div>
        <div className="category-detail">
          <div>
            {monthly ? copy.category.monthly : weekly}
          </div>
          <div>
            {expense ? copy.category.expense : revenue}
          </div>
        </div>
        <div className="category-icon">
          <Icon className={icon_class_name} />
        </div>
        <div className="category-accrual">
          {accrual ? copy.category.accrual : ""}
        </div>
        <div className="category-option-buttons">
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
        <ExtraInfo
          dispatch={dispatch}
          {...category}
        />
      </div>
    )
  }
}

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Row)
