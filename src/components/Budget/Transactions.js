import React from 'react'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const Transaction = (props) => {
  return (
    <div className="budget-item-detail">
      <div className="date">
        {props.clearance_date ? props.clearance_date : 'pending'}
      </div>
      <div className="account">
        {props.account_name}
      </div>
      <div className="description">
        {props.description}
      </div>
      <div className="amount">
        {MoneyFormatter(props.amount)}
      </div>
      <hr/>
    </div>
  )
}

const Transactions = (props) => {
  if (props.transactions.length > 0) {
    return (
      <div className="budget-transactions">
        <div className="budget-item-detail">
          <div className="labels">
            <div className="date">
              Date
            </div>
            <div className="account">
              Account
            </div>
            <div className="description">
              Description
            </div>
            <div className="amount">
              Amount
            </div>
          </div>
          <hr/>
        </div>
        {props.transactions.map((transaction) =>
          <Transaction key={transaction.id} {...transaction} />
        )}
      </div>
    )
  } else {
    return null
  }
}

export default Transactions;
