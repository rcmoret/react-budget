import React from "react"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

export default ({ difference, diffOperator, operator, showDetail, spent }) => {
  if (showDetail) {
    return (
      <div>
        <div className="detail-amount underscore">
          {operator} {MoneyFormatter(spent, { absolute: true })}
        </div>
        <div className="detail-amount">
          {diffOperator} {MoneyFormatter(difference, { absolute: true })}
        </div>
      </div>
    )
  } else {
    return null
  }
}