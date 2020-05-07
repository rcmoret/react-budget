import React from "react"
import { connect } from "react-redux"

import { fetchedBudgetItems, fetchedTransactions } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"

import Transactions from "./Transactions"

const Wrapper = (props) => {
  const {
    accountId,
    dispatch,
    fetched,
    month,
    urlAccountId,
    urlMonth,
    urlYear,
    year,
  } = props

  if (!Number.isInteger(urlAccountId)) {
    return null
  }

  const fetchTransactions = () => {
    const url = ApiUrlBuilder(
      ["accounts", urlAccountId, "transactions"], { month: urlMonth, year: urlYear }
    )
    const onSuccess = data => dispatch(fetchedTransactions(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
  }

  const fetchBudgetItems = () => {
    const url = ApiUrlBuilder(["budget", "items"], { month: urlMonth, year: urlYear })
    const onSuccess = data => dispatch(fetchedBudgetItems(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
  }

  const isNewMonthYear = !(urlMonth === month && urlYear === year)
  const isTransctionCacheStale = (isNewMonthYear ||  urlAccountId !== accountId)
  const isBudgetCacheStale = (!fetched || isNewMonthYear)

  if (isTransctionCacheStale || isBudgetCacheStale) {
    if (isTransctionCacheStale) {
      fetchTransactions()
    }
    if (isBudgetCacheStale) {
      fetchBudgetItems()
    }
  }

  return (
    <Transactions {...props} />
  )
}

const mapStateToProps = (state, ownProps) => {
  const { query_options } = state.transactions.metadata
  const { fetched } = state.transactions.budgetItems

  return {
    accountId: parseInt(query_options.account_id),
    fetched: fetched,
    month: parseInt(query_options.month),
    slug: ownProps.slug,
    urlAccountId: ownProps.accountId,
    urlMonth: ownProps.month,
    urlYear: ownProps.year,
    year: parseInt(query_options.year),
  }
}

export default connect(mapStateToProps)(Wrapper)
