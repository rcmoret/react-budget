import React from "react"

import { transaction as copy } from "../../../locales/copy"

import * as DateHelpers from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

const Transaction = (props) => {
  const {
    pending,
  } = copy

  const {
    account_name,
    amount,
    clearance_date,
  } = props
  const displayDescription = props.description || props.budgetCategory

  return (
    <div className="budget-item-transaction-row">
      <div className="budget-transaction-cell clearance-date">
        <span className="long-date">
          {clearance_date ? DateHelpers.fromDateString(clearance_date) : pending}
        </span>
        <span className="short-date">
          {clearance_date ? DateHelpers.fromDateString(clearance_date, { format: "m/d" }) : pending}
        </span>
      </div>
      <div className="budget-transaction-cell">
        {account_name}
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
