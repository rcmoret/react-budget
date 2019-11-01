import React from "react"
import Icon from "../../Icons/Icon"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount, budgetCategory, iconClassName, showDetail }) => {
  if (showDetail) {
    return (
      <div className="transaction detail-show">
        <div className="left-icon">
        </div>
        <div className="clearance-date">
        </div>
        <div className="description">
        </div>
        <div className="amount">
          {MoneyFormatter(amount)}
        </div>
        <div className="balance">
        </div>
        <div className="budget-categories">
          <Icon className={iconClassName} /> {budgetCategory}
        </div>
      </div>
    )
  } else {
    return null
  }
}
