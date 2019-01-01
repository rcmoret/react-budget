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

  transactionsWithBal() {
    let balance = this.state.metadata.prior_balance
    const arr = this.state.transactions.map(function(transaction) {
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
