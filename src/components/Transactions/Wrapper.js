import React from "react"
import { connect } from "react-redux"

import { fetchedTransactions } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/RestApiClient"

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
    const url = ApiUrlBuilder(
      ["accounts", urlAccountId, "transactions"], { month: urlMonth, year: urlYear }
    )
    get(url, data => dispatch(fetchedTransactions(data)))
  }

  return (
    <Transactions {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { query_options } = state.transactions.metadata

  return {
    accountId: parseInt(query_options.account_id),
    month: parseInt(query_options.month),
    urlAccountId: ownProps.accountId,
    urlMonth: ownProps.month,
    urlYear: ownProps.year,
    year: parseInt(query_options.year),
  }
}

export default connect(mapStateToProps)(Wrapper)
