import React from "react"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

const AccountContainer = (props) => (
  <div className="account-edit">
    <div>
      <h3>
        {props.name}
      &nbsp;
        <Link
          to="#"
          className="far fa-edit"
          onClick={props.showForm}
        />
      </h3>
      <div className="cash-flow">
        {props.cash_flow ? "Cash Flow" : "Non-Cash Flow"}
      </div>
      <div className="balance">
        Balance: {MoneyFormatter(props.balance)}
      </div>
      <div className="priority">
        Priority: {props.priority}
      </div>
    </div>
  </div>
)

export default AccountContainer;
