import React from "react"

import * as DateFormatter from "../../shared/Functions/DateFormatter"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

import DeleteButton from "./DeleteButton"

export default ({ from_transaction, id, to_transaction }) => {
  const { amount } = to_transaction
  const clearanceDate = () => {
    if (from_transaction.clearance_date) {
      return DateFormatter.fromDateString(from_transaction.clearance_date)
    } else if (to_transaction.clearance_date) {
      return DateFormatter.fromDateString(to_transaction.clearance_date)
    } else {
      return "pending"
    }
  }

  return (
    <div className="transfer">
      <div className="clearance-date">
        {clearanceDate()}
      </div>
      <div className="from-account">
        {from_transaction.account_name}
      </div>
      <div className="to-account">
        {to_transaction.account_name}
      </div>
      <div className="amount">
        {MoneyFormatter(to_transaction.amount)}
      </div>
      <DeleteButton
        id={id}
        amount={amount}
        from_account_id={from_transaction.account_id}
        to_account_id={to_transaction.account_id}
      />
    </div>
  )
}
