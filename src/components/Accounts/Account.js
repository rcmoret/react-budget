import React from "react"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

const Account = (props) => {
  const { id, name, balance, isSelected } = props
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

export default Account
