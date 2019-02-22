import React from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { deleted, update } from "../../actions/accounts"
import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"
import Edit from "./Edit"

const AccountShow = (props) => {
  const { id } = props

  const showForm = (e) => {
    e.preventDefault()
    const action = update({ id: id, showForm: true })
    props.dispatch(action)
  }

  const destroy = (e) => {
    const confirmation = window.confirm(`Do you really want to delete ${props.name} Account?`)
    if (!confirmation) { return }
    const url = ApiUrlBuilder(["accounts", id])
    fetch(url, { method: "delete" })
    .then(() => props.dispatch(deleted({ id: id })))
  }

  if (props.showForm) {
    return (
      <Edit
        {...props}
      />
    )
  } else {
    const { balance, cash_flow, name, priority } = props
    return (
      <div className="account-edit">
        <div>
          <h3>
            {name}
            {" "}
            <Link
              to="#"
              className="far fa-edit"
              onClick={showForm}
            />
          </h3>
          <div className="cash-flow">
            {cash_flow ? "Cash Flow" : "Non-Cash Flow"}
          </div>
          <div className="balance">
            Balance: {MoneyFormatter(balance)}
          </div>
          <div className="priority">
            Priority: {priority}
          </div>
          <div>
            <button type="delete" onClick={destroy} className="delete-account">
              Delete
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
