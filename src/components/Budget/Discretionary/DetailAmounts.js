import React from "react"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

export default (props) => {
  const { overUnderBudgetAmount, spent, total_remaining } = props
  const overUnderOperator = overUnderBudgetAmount >= 0 ? "+" : "-"
  const spentDepositedOperator = spent >= 0 ? "+" : "-"
  if (props.showDetail) {
    return (
      <div>
        <div>
          {overUnderOperator} {MoneyFormatter(overUnderBudgetAmount, { absolute: true })}
        </div>
        <div className="detail-amount underscore">
          {spentDepositedOperator} {MoneyFormatter(spent, { absolute: true })}
        </div>
        <div>
          {MoneyFormatter(total_remaining, { absolute: false })}
        </div>
      </div>
    )
  } else {
    return null
  }
}
