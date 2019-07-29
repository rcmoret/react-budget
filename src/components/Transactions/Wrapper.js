import React, { Component } from "react"
import { connect } from "react-redux"

import { fetchedTransactions } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"

import Transactions from "./Transactions"

class Wrapper extends Component {
  fetchTransactions(accountId, monthYear) {
    if (!Number.isInteger(accountId)) {
      return
    } else {
      const url = ApiUrlBuilder(
        ["accounts", accountId, "transactions"], { ...monthYear }
      )
      get(url, data => this.props.dispatch(fetchedTransactions(data)))
    }
  }

  componentWillMount() {
    const { month, year } = this.props
    this.fetchTransactions(this.props.accountId, { month: month, year: year })
  }

  componentWillReceiveProps(nextProps) {
    const { month, year } = nextProps
    this.fetchTransactions(nextProps.accountId, { month: month, year: year })
  }

  render() {
    return (
      <Transactions {...this.props} />
    )
  }
}

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Wrapper)
