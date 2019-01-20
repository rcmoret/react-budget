import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const Transaction = (props) => {
  const displayDescription = props.description || props.budgetCategory
  return (
    <span>
      <div className="budget-item-detail">
        <div className="budget-transaction-cell">
          {props.clearance_date ? props.clearance_date : 'pending'}
        </div>
        <div className="budget-transaction-cell">
          {props.account_name}
        </div>
        <div className="budget-transaction-cell">
          {displayDescription}
        </div>
        <div className="budget-transaction-cell">
          {MoneyFormatter(props.amount)}
        </div>
      </div>
      <hr/>
    </span>
  )
}

export default Transaction
