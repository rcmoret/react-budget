import React from "react"

import MoneyFormatter from "../../functions/MoneyFormatter"

import { Link } from "react-router-dom"

export default ({ id, name, balance, selectedAccountId, slug }) => (
  <Link to={`/accounts/${slug}`}>
    <div className={`account ${selectedAccountId === id ? "active" : "" }`}>
      <h3>{name}</h3>
      <hr/>
      <p className="balance">{MoneyFormatter(balance)}</p>
    </div>
  </Link>
)
