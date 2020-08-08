import React from "react"

import MoneyFormatter from "../../functions/MoneyFormatter"

import { Link } from "react-router-dom"

export default ({ id, name, balance, selectedAccountId, slug }) => (
  <Link to={`/accounts/${slug}`}>
    <div className={`account ${selectedAccountId === id ? "active" : "" }`}>
      <div className="account-name">
        <h3>{name}</h3>
      </div>
      <div className="balance">
        <div>{MoneyFormatter(balance)}</div>
      </div>
    </div>
  </Link>
)
