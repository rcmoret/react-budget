import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ difference, diffOperator, operator, showDetail, spent }) => {
  if (!showDetail) {
    return null
  }

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
}
