import React from "react"
import { connect } from "react-redux"

import { fetchedBudgetItems, fetchedTransactions } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"
import FindOrDefault from "../../functions/FindOrDefault"

import Transactions from "./Transactions"

const Wrapper = (props) => {
  const {
    accountId,
    isApiUnauthorized,
    dispatch,
    fetched,
    month,
    selectedAccount,
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
    const url = ApiUrlBuilder({
      route: "transactions-index",
      accountId: urlAccountId,
      query: { month: urlMonth, year: urlYear },
    })
    const onSuccess = data => dispatch(fetchedTransactions({...data, slug: slug, selectedAccount: selectedAccount }))
    get(url, onSuccess)
  }

  const fetchBudgetItems = () => {
    const url = ApiUrlBuilder({ route: "budget-items-index", query: { month: urlMonth, year: urlYear } })
    const onSuccess = data => dispatch(fetchedBudgetItems(data))
    get(url, onSuccess)
  }

  const isNewMonthYear = !(urlMonth === month && urlYear === year)
  const isTransctionCacheStale = (isNewMonthYear ||  urlAccountId !== accountId)
  const isBudgetCacheStale = (!fetched || isNewMonthYear)

  if (isApiUnauthorized) {
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
  const isApiUnauthorized = state.api.status === 401
  const selectedAccount = FindOrDefault(state.accounts.collection, account => account.id === ownProps.accountId, { cash_flow: true })

  return {
    accountId: parseInt(query_options.account_id),
    isApiUnauthorized: isApiUnauthorized,
    fetched: fetched,
    month: parseInt(query_options.month),
    selectedAccount: selectedAccount,
    slug: ownProps.slug,
    urlAccountId: ownProps.accountId,
    urlMonth: ownProps.month,
    urlYear: ownProps.year,
    year: parseInt(query_options.year),
  }
}

export default connect(mapStateToProps)(Wrapper)
