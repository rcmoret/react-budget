import React from "react"

import MoneyFormatter from "../../functions/MoneyFormatter"

import { Link } from "react-router-dom"

export default ({ id, name, balance, currentMonth, currentYear, dateParams, selectedAccountId, slug }) => {
  const month = selectedAccountId === id ? currentMonth : { month: currentMonth, ...dateParams }.month
  const year = selectedAccountId === id ? currentYear : { year: currentYear, ...dateParams }.year
  const accountUrl = `/accounts/${slug}/${month}/${year}`

  return (
    <Link to={accountUrl}>
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
}
