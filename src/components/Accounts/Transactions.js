import React, { Component } from 'react';
import Transaction from './Transaction';
import API_URL from '../../shared/Constants/Api'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      metadata: {},
      ...props
    }
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

  render() {
    return(
      <div className="transactions">
        <h3>Transactions</h3>
        {this.state.transactions.map((transaction) =>
                           <Transaction
                             key={transaction.id}
                             {...transaction}
                           />
                          )
        }
      </div>
    )
  }
}

export default Transactions;
