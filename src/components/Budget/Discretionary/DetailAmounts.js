import React from "react"

import { budget as copy } from "../../../locales/copy"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default (props) => {
  const { minus, plus } = copy.shared
  const {
    overUnderBudgetAmount,
    showDetail,
    spent,
    total_remaining
  } = props

  const overUnderOperator = overUnderBudgetAmount >= 0 ? plus : minus
  const spentDepositedOperator = spent >= 0 ? plus : minus

  if (showDetail) {
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
