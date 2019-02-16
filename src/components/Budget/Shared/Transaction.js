import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const Transaction = (props) => {
  const displayDescription = props.description || props.budgetCategory
  return (
    <div className="budget-item-transaction-row">
      <div>
        <div className="budget-transaction-cell">
          {props.clearance_date ? props.clearance_date : 'pending'}
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
      <hr/>
    </div>
  )
}

export default Transaction
