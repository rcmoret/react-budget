import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"


const OverUnderBudget = (props) => {
  const { overUnderBudgetAmount } = props
  if (overUnderBudgetAmount === 0) {
    return null
  } else if (overUnderBudgetAmount > 0) {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Ahead of Budget:</div>
        <div className="detail-amount"> + {MoneyFormatter(overUnderBudgetAmount)}</div>
      </div>
    )
  } else {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Over Budget: </div>
        <div className="detail-amount"> - {MoneyFormatter(overUnderBudgetAmount, { absolute: true })} </div>
      </div>
    )
  }
}

export default OverUnderBudget
