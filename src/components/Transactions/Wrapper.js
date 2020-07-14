import React from "react"
import { connect } from "react-redux"

import { fetchedBudgetItems, fetchedTransactions } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"

import Transactions from "./Transactions"

const Wrapper = (props) => {
  const {
    accountId,
    apiErrorPresent,
    apiKey,
    dispatch,
    fetched,
    month,
    slug,
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
      ["accounts", urlAccountId, "transactions"], { month: urlMonth, year: urlYear, key: apiKey }
    )
    const onSuccess = data => dispatch(fetchedTransactions({...data, slug: slug }))
    get(url, onSuccess)
  }

  const fetchBudgetItems = () => {
    const url = ApiUrlBuilder(["budget", "items"], { month: urlMonth, year: urlYear, key: apiKey })
    const onSuccess = data => dispatch(fetchedBudgetItems(data))
    get(url, onSuccess)
  }

  const isNewMonthYear = !(urlMonth === month && urlYear === year)
  const isTransctionCacheStale = (isNewMonthYear ||  urlAccountId !== accountId)
  const isBudgetCacheStale = (!fetched || isNewMonthYear)

  if (apiErrorPresent) {
    return null
  } else if (isTransctionCacheStale || isBudgetCacheStale) {
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
  const { apiKey } = state.apiKey
  const apiErrorPresent = state.messages.errors.api.length > 0

  return {
    accountId: parseInt(query_options.account_id),
    apiErrorPresent: apiErrorPresent,
    apiKey: apiKey,
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
