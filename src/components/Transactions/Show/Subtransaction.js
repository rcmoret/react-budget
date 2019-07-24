import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount, budget_category, description, showDetail }) => {
  if (showDetail) {
    return (
      <div className="transaction subtransaction-show">
        <div className="left-icon">
        </div>
        <div className="clearance-date">
        </div>
        <div className="description">
          {description}
        </div>
        <div className="amount">
          {MoneyFormatter(amount)}
        </div>
        <div className="balance">
        </div>
        <div className="budget-categories">
          {budget_category}
        </div>
      </div>
    )
  } else {
    return null
  }
}
