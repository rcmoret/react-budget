import React, { Component } from 'react';
import Transaction from './Transaction';
import API_URL from '../../shared/Constants/Api'

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
      fetch(API_URL + '/accounts/' + accountId + '/transactions')
        .then(response => response.json())
        .then(data => this.setState({
          ...data
          })
       )
    }
  }

  componentWillMount() {
    this.fetchTransactions(this.state.activeAccount)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
    this.fetchTransactions(nextProps.activeAccount)
  }

  dateRange() {
    let str = "Transactions from: "
    str += this.state.metadata.date_range[0]
    str += " to "
    str += this.state.metadata.date_range[1]
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
    if (this.state.activeAccount === null) {
      return (
        <div className="transactions">
          <h2>Transactions</h2>
          <div className='transaction-metadata'>
            <h3>Select An Account</h3>
          </div>
          <hr/>
        </div>
      )
    } else {
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
        </div>
      )
    }
  }
}

export default Transactions;
