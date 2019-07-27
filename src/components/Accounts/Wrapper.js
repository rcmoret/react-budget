import React from "react"
import { connect } from 'react-redux';
import { fetched } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"

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
    const url = ApiUrlBuilder(["accounts"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetched(data)))
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
