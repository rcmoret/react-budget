import React from 'react';
import { connect } from "react-redux"
import AddTransaction from "./AddTransaction"
import Transaction from "./Transaction";
import * as DateFormatter from "../../shared/Functions/DateFormatter"

const Transactions = (props) => {
  const dateRange = () => {
    let str = "Transactions from: "
    str += DateFormatter.fromDateString(props.metadata.date_range[0])
    str += " to "
    str += DateFormatter.fromDateString(props.metadata.date_range[1])
    return str
  }

  const orderedTransactions = () => {
    const date = new Date()
    const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
    return props.collection.sort(function(a, b) {
      if (a.clearance_date === b.clearance_date) {
        return 0
      } else if (a.clearance_date === null) {
        return b.clearance_date > today ? -1 : 1
      } else if (b.clearance_date === null) {
        return a.clearance_date > today ? 1 : -1
      } else {
        // equailty is handled above
        return (a.clearance_date > b.clearance_date) ? 1 : -1
      }
    })
  }

  const transactionsWithBal = () => {
    let balance = props.metadata.prior_balance
    const arr = orderedTransactions().map((transaction) => {
      balance += transaction.amount
      return { balance: balance, ...transaction }
    })
    return arr
  }

  const initialTransaction = () => {
    return {
      balance: props.metadata.prior_balance,
      clearance_date: props.metadata.date_range[0],
      amount: null,
      description: 'Balance',
      subtransactions: [],
    }
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className='transaction-metadata'>
        {dateRange()}
      </div>
      <hr/>
      <Transaction key='0' {...initialTransaction()} />
      {transactionsWithBal().map((transaction) =>
        <Transaction
          key={transaction.id}
          {...transaction}
        />
      )}
    <AddTransaction {...props} />
    </div>
  )
}

export default connect(state => state.transactions)(Transactions)
