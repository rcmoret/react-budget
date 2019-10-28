import React from "react"

import * as DateFormatter from "../../functions/DateFormatter"
import MoneyFormatter from "../../functions/MoneyFormatter"

import DeleteButton from "./DeleteButton"

export default ({ fromTransaction, id, toTransaction }) => {
  const { details } = toTransaction
  const amount = details.reduce((sum, txn) => sum + txn.amount, 0)
  const clearanceDate = () => {
    if (fromTransaction.clearanceDate) {
      return DateFormatter.fromDateString(fromTransaction.clearanceDate)
    } else if (toTransaction.clearanceDate) {
      return DateFormatter.fromDateString(toTransaction.clearanceDate)
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
        {fromTransaction.accountName}
      </div>
      <div className="to-account">
        {toTransaction.accountName}
      </div>
      <div className="amount">
        {MoneyFormatter(amount)}
      </div>
      <DeleteButton
        id={id}
        amount={amount}
        from_account_id={fromTransaction.accountId}
        to_account_id={toTransaction.accountId}
      />
    </div>
  )
}
