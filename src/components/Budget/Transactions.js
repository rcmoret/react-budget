import React from 'react'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const Transaction = (props) => {
  return (
    <div className="budget-item-detail">
      <div className="budget-transaction-cell">
        {props.clearance_date ? props.clearance_date : 'pending'}
      </div>
      <div className="budget-transaction-cell">
        {props.account_name}
      </div>
      <div className="budget-transaction-cell">
        {props.description}
      </div>
      <div className="budget-transaction-cell">
        {MoneyFormatter(props.amount)}
      </div>
    </div>
  )
}

const Transactions = (props) => {
  if (props.transactions.length > 0) {
    return (
      <div className="budget-transactions">
        <div className="budget-item-detail">
          <div className="labels">
            <div className="budget-transaction-cell">
              Date
            </div>
            <div className="budget-transaction-cell">
              Account
            </div>
            <div className="budget-transaction-cell">
              Description
            </div>
            <div className="budget-transaction-cell">
              Amount
            </div>
          </div>
        </div>
        <hr/>
        {props.transactions.map((transaction) =>
          <span>
            <Transaction key={transaction.id} {...transaction} />
            <hr/>
          </span>
        )}
      </div>
    )
  } else {
    return null
  }
}

export default Transactions;
