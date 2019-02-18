import React from 'react';
import { connect } from "react-redux"
import AddTransaction from "./AddTransaction"
import Transaction from "./Transaction";
import * as DateFormatter from "../../shared/Functions/DateFormatter"

const Transactions = (props) => {
  const dateRange = `Transactions from: ${props.startDate} to ${props.endDate}`

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className='transaction-metadata'>
        {dateRange}
      </div>
      <hr/>
      <Transaction key='0' {...props.initialTransaction} />
      {props.collection.map(transaction =>
        <Transaction
          key={transaction.id}
          {...transaction}
        />
      )}
    <AddTransaction />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { collection, metadata } = state.transactions
  const startDate = DateFormatter.fromDateString(metadata.date_range[0])
  const endDate =  DateFormatter.fromDateString(metadata.date_range[1])
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)

  const orderedTransactions = collection.sort(function(a, b) {
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

  const collectionWithBalance = () => {
    let balance = metadata.prior_balance
    return orderedTransactions.map(transaction => {
      balance += transaction.amount
      return { balance: balance, ...transaction }
    })
  }

  const initialTransaction = {
    balance: metadata.prior_balance,
    clearance_date: metadata.date_range[0],
    amount: null,
    description: 'Balance',
    subtransactions: [],
  }

  return {
    ...state.transactions,
    startDate: startDate,
    endDate: endDate,
    initialTransaction: initialTransaction,
    collection: collectionWithBalance(),
  }
}

export default connect(mapStateToProps)(Transactions)
