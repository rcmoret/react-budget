import React from "react"

import * as DateHelpers from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

const Transaction = (props) => {
  const displayDescription = props.description || props.budgetCategory
  return (
    <div className="budget-item-transaction-row">
      <div className="budget-transaction-cell clearance-date">
        <span className="long-date">
          {props.clearance_date ? DateHelpers.fromDateString(props.clearance_date) : "pending"}
        </span>
        <span className="short-date">
          {props.clearance_date ? DateHelpers.fromDateString(props.clearance_date, { format: "m/d" }) : "pending"}
        </span>
      </div>
      <div className="budget-transaction-cell">
        {props.account_name}
      </div>
      <div className="budget-transaction-cell">
        {displayDescription}
      </div>
      <div className="budget-transaction-cell amount">
        {MoneyFormatter(props.amount)}
      </div>
    </div>
  )
}

export default Transaction
