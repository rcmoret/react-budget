import React from "react"
import { connect } from "react-redux"

import { account as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"
import { deleted, update } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import MoneyFormatter from "../../functions/MoneyFormatter"

import Edit from "./Edit"
import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"

const AccountShow = (props) => {
  const {
    id,
    balance,
    cash_flow,
    dispatch,
    name,
    priority,
    showForm,
  } = props

  const {
    cashFlow,
    deleteButtonText,
    deleteConfirmationMessage,
    nonCashFlow,
  } = copy

  const revealForm = () => {
    const action = update({ id: id, showForm: true })
    dispatch(action)
  }

  const destroy = () => {
    const confirmation = window.confirm(deleteConfirmationMessage(name))
    if (!confirmation) { return }
    const url = ApiUrlBuilder(["accounts", id])
    fetch(url, { method: "delete" })
      .then(() => dispatch(deleted({ id: id })))
  }

  if (showForm) {
    return (
      <Edit
        {...props}
      />
    )
  } else {
    return (
      <div className="account-edit">
        <div>
          <h3>
            {name}
            {" "}
            <Link
              to="#"
              className="far fa-edit"
              onClick={revealForm}
            />
          </h3>
          <div className="cash-flow">
            {titleize(cash_flow ? cashFlow : nonCashFlow)}
          </div>
          <div className="balance">
            {copy.balance}: {MoneyFormatter(balance)}
          </div>
          <div className="priority">
            {copy.priority}: {priority}
          </div>
          <div>
            <button type="delete" onClick={destroy} className="delete-account">
              {titleize(deleteButtonText)}
              {" "}
              <Icon className="fas fa-trash" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(AccountShow)
