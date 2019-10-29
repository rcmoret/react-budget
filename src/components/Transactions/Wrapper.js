import React from "react"
import { connect } from "react-redux"

import { fetchedTransactions } from "../../actions/transactions"

import { getTransactions } from "./graphqlQueries"

import Transactions from "./Transactions"

const Wrapper = (props) => {
  const {
    accountId,
    dispatch,
    month,
    urlAccountId,
    urlMonth,
    urlYear,
    year,
  } = props

  if (!Number.isInteger(urlAccountId)) {
    return null
  }

  if (urlMonth !== month || urlYear !== year || urlAccountId !== accountId) {
    const onSuccess = (result) => dispatch(fetchedTransactions(result.data.transactions))
    getTransactions({
      accountId: urlAccountId,
      month: urlMonth,
      year: urlYear,
      onSuccess: onSuccess
    })
  }

  return (
    <Transactions {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const {
    accountId,
    dateRange,
    month,
    year,
  } = state.transactions.metadata

  return {
    accountId: accountId,
    dateRange: dateRange,
    month: month,
    urlAccountId: ownProps.accountId,
    urlMonth: ownProps.month,
    urlYear: ownProps.year,
    year: year,
  }
}

export default connect(mapStateToProps)(Wrapper)
