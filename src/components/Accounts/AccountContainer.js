import React from "react"
import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

const AccountContainer = ({ balance, cash_flow, destroy, name, priority, showForm }) => (
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

export default AccountContainer
