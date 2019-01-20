import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'


const OverUnderBudget = (props) => {
  const { overUnderBudget } = props
  if (overUnderBudget === 0) {
    return null
  } else if (overUnderBudget > 0) {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Under Budget:</div>
        <div className='detail-amount'> + {MoneyFormatter(overUnderBudget)}</div>
      </div>
    )
  } else {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Over Budget: </div>
        <div className='detail-amount'> - {MoneyFormatter(overUnderBudget, { absolute: true })} </div>
      </div>
    )
  }
}

export default OverUnderBudget
