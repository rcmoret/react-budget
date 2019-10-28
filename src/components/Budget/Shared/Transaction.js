import React from "react"

import { transaction as copy } from "../../../locales/copy"

import * as DateHelpers from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

const Transaction = (props) => {
  const {
    pending,
  } = copy

  const {
    accountName,
    details,
    clearanceDate,
  } = props
  const displayDescription = props.description || props.budgetCategory
  const amount = details.reduce((sum, txn) => sum + txn.amount, 0)

  return (
    <div className="budget-item-transaction-row">
      <div className="budget-transaction-cell clearance-date">
        <span className="long-date">
          {clearanceDate ? DateHelpers.fromDateString(clearanceDate) : pending}
        </span>
        <span className="short-date">
          {clearanceDate ? DateHelpers.fromDateString(clearanceDate, { format: "m/d" }) : pending}
        </span>
      </div>
      <div className="budget-transaction-cell">
        {accountName}
      </div>
      <div className="budget-transaction-cell">
        {displayDescription}
      </div>
      <div className="budget-transaction-cell amount">
        {MoneyFormatter(amount)}
      </div>
    </div>
  )
}

export default Transaction
