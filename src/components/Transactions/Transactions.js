import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddTransaction from './AddTransaction'
import Transaction from './Transaction';
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'
import DateFormatter from '../../shared/Functions/DateFormatter'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      metadata: {
        date_range: ['', ''],
        prior_balance: 0,
      },
      ...props
    }
    this.transactionsWithBal = this.transactionsWithBal.bind(this)
    this.dateRange = this.dateRange.bind(this)
    this.initialTransaction = this.initialTransaction.bind(this)
    this.orderedTransactions = this.orderedTransactions.bind(this)
  }

  fetchTransactions(accountId) {
    if (!Number.isInteger(accountId)) {
      return
    } else {
      fetch(ApiUrlBuilder(['accounts', accountId, 'transactions']))
        .then(response => response.json())
        .then(data => this.setState({
          ...data
          })
       )
    }
  }

  componentWillMount() {
    this.fetchTransactions(this.state.selectedAccount.id)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
    this.fetchTransactions(nextProps.selectedAccount.id)
  }

  dateRange() {
    let str = "Transactions from: "
    str += DateFormatter(this.state.metadata.date_range[0])
    str += " to "
    str += DateFormatter(this.state.metadata.date_range[1])
    return str
  }

  orderedTransactions() {
    const date = new Date()
    const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
    return this.state.transactions.sort(function(a, b) {
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

  transactionsWithBal() {
    let balance = this.state.metadata.prior_balance
    const arr = this.orderedTransactions().map(function(transaction) {
      balance += transaction.amount
      return { balance: balance, ...transaction }
    })
    return arr
  }

  initialTransaction() {
    return {
      balance: this.state.metadata.prior_balance,
      clearance_date: this.state.metadata.date_range[0],
      amount: null,
      description: 'Balance',
      subtransactions: [],
    }
  }

  render() {
    return (
      <div className="transactions">
        <h2>Transactions</h2>
        <div className='transaction-metadata'>
          {this.dateRange()}
        </div>
        <hr/>
        <Transaction key='0' {...this.initialTransaction()} />
        {this.transactionsWithBal().map((transaction) =>
          <Transaction
            key={transaction.id}
            {...transaction}
          />
        )}
      <AddTransaction {...this.state} />
      </div>
    )
  }
}

export default Transactions;
