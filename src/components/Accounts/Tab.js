import React from "react"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

export default ({ id, name, balance, selectedAccountId }) => {
  const isSelected = selectedAccountId === id
  return (
    <Link to={`/accounts/${id}`}>
      <div className={`account ${isSelected ? "active" : "" }`}>
        <h3>{name}</h3>
        <hr/>
        <p className="balance">{MoneyFormatter(balance)}</p>
      </div>
    </Link>
  )
}
