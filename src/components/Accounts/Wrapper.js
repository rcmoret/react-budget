import React from "react"
import { connect } from "react-redux"
import { fetched } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"
import FindOrDefault from "../../functions/FindOrDefault"
import { today as Today } from "../../functions/DateFormatter"

import Details from "./Details"
import { Redirect } from "react-router-dom"
import Tabs from "./Tabs"

const Wrapper = (props) => {
  const {
    accountsFetched,
    isApiUnauthorized,
    collection,
    dateParams,
    dispatch,
    month,
    selectedAccount,
    selectedAccountId,
    slug,
    year,
  } = props

  if (!isApiUnauthorized && !accountsFetched) {
    const url = ApiUrlBuilder({ route: "accounts-index" })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
    return null
  }

  const today = Today("object")
  const currentYear = today.year
  const currentMonth = today.month

  if ((dateParams.month && dateParams.year) || selectedAccountId === 0) {
    return (
      <div className="accounts">
        <Tabs
          collection={collection}
          currentMonth={currentMonth}
          currentYear={currentYear}
          dateParams={dateParams}
          selectedAccountId={selectedAccountId}
        />
        <Details
          month={month}
          selectedAccountId={selectedAccountId}
          selectedAccount={selectedAccount}
          slug={slug}
          year={year}
        />
      </div>
    )
  } else {
    return (
      <Redirect to={`/accounts/${slug}/${month}/${year}`} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const nullAccount = {
    id: 0,
    cash_flow: true,
    name: "",
    priority: "",
    slug: null,
  }

  const slug = ownProps.match.params.slug || state.transactions.slug
  const selectedAccount = FindOrDefault(state.accounts.collection, acct => acct.slug === slug, nullAccount)
  const selectedAccountId = selectedAccount.id
  const month = parseInt(ownProps.match.params.month) || state.transactions.metadata.query_options.month
  const year = parseInt(ownProps.match.params.year) || state.transactions.metadata.query_options.year
  const accountsFetched = state.accounts.accountsFetched
  const collection = state.accounts.collection.sort((a, b) => a.priority - b.priority)
  const isApiUnauthorized = state.api.status === 401

  return {
    accountsFetched: accountsFetched,
    isApiUnauthorized: isApiUnauthorized,
    collection: collection,
    month: month,
    dateParams: { ...ownProps.match.params },
    selectedAccountId: selectedAccountId,
    selectedAccount: selectedAccount,
    slug: slug,
    year: year,
  }
}

export default connect(mapStateToProps)(Wrapper)
