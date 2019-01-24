import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchedTransactions } from "../../actions/transactions"
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'
import Transactions from "./Transactions"

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.fetchTransactions = this.fetchTransactions.bind(this)
  }

  fetchTransactions(accountId) {
    if (!Number.isInteger(accountId)) {
      return
    } else {
    const url = ApiUrlBuilder(['accounts', accountId, 'transactions'])
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(fetchedTransactions(data)))
    }
  }

  componentWillMount() {
    this.fetchTransactions(this.props.accountId)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchTransactions(nextProps.accountId)
  }

  render() {
    return (
      <Transactions />
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Wrapper)
