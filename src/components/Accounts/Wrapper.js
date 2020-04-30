import React from "react"
import { connect } from 'react-redux';
import { fetched } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"
import FindOrDefault from "../../functions/FindOrDefault"

import Details from "./Details"
import { Redirect } from "react-router-dom"
import Tabs from "./Tabs"

const Wrapper = (props) => {
  const {
    accountsFetched,
    collection,
    dateParams,
    dispatch,
    month,
    selectedAccount,
    selectedAccountId,
    year,
  } = props

  if (!accountsFetched) {
    const url = ApiUrlBuilder(["accounts"])
    const onSuccess = data => dispatch(fetched(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
    return null
  }


  if ((dateParams.month && dateParams.year) || selectedAccountId === 0) {
    return (
      <div className="accounts">
        <Tabs
          collection={collection}
          selectedAccountId={selectedAccountId}
        />
        <Details
          month={month}
          selectedAccountId={selectedAccountId}
          selectedAccount={selectedAccount}
          year={year}
        />
        <hr/>
      </div>
    )
  } else {
    return (
      <Redirect to={`/accounts/${selectedAccountId}/${month}/${year}`} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedAccountId = parseInt(ownProps.match.params.id || state.transactions.metadata.query_options.account_id || 0)
  const month = parseInt(ownProps.match.params.month) || state.transactions.metadata.query_options.month
  const year = parseInt(ownProps.match.params.year) || state.transactions.metadata.query_options.year
  const accountsFetched = state.accounts.accountsFetched
  const collection = state.accounts.collection.sort((a, b) => a.priority - b.priority)

  const nullAccount = {
    id: null,
    cash_flow: true,
    name: "",
    priority: "",
  }

  const selectedAccount = FindOrDefault(state.accounts.collection, acct => acct.id === selectedAccountId, nullAccount)

  return {
    accountsFetched: accountsFetched,
    collection: collection,
    month: month,
    dateParams: {
      month: ownProps.match.params.month,
      year: ownProps.match.params.year,
    },
    selectedAccountId: selectedAccountId,
    selectedAccount: selectedAccount,
    year: year,
  }
}

export default connect(mapStateToProps)(Wrapper)
