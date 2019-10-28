import React from "react"
import { connect } from "react-redux"
import { fetched } from "./actions"

import { getAccounts } from "./graphqlQueries"

import Details from "./Details"
import Tabs from "./Tabs"

const Wrapper = (props) => {
  const {
    accountsFetched,
    collection,
    dispatch,
    month,
    selectedAccountId,
    year,
  } = props

  if(!accountsFetched) {
    const action = (accounts) => dispatch(fetched(accounts))
    getAccounts(result => action(result.data.accounts))
  }


  return (
    <div className="accounts">
      <Tabs
        collection={collection}
        selectedAccountId={selectedAccountId}
      />
      <Details
        month={month}
        selectedAccountId={selectedAccountId}
        year={year}
      />
      <hr/>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const selectedAccountId = parseInt(ownProps.match.params.id || 0)
  const today = new Date()
  const month = parseInt(ownProps.match.params.month) || today.getMonth() + 1
  const year = parseInt(ownProps.match.params.year) || today.getFullYear()
  const accountsFetched = state.accounts.accountsFetched
  const collection = state.accounts.collection.sort((a, b) => {
    return a.priority - b.priority
  })

  return {
    collection: collection,
    selectedAccountId: selectedAccountId,
    month: month,
    year: year,
    accountsFetched: accountsFetched,
  }
}

export default connect(mapStateToProps)(Wrapper)
