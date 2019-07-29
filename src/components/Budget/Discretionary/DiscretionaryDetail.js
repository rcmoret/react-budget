import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { fetchedDiscretionaryTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"

import Details from "../Shared/Details"
import Transactions from "./../Shared/Transactions"

const DiscretionaryDetail = (props) => {
  const {
    collection,
    dispatch,
    fetchedTransactions,
    month,
    showDetail,
    year,
  } = props

  if (showDetail && !fetchedTransactions ) {
    const url = ApiUrlBuilder(["budget", "discretionary", "transactions"], { month: month, year: year })
    get(url, data => dispatch(fetchedDiscretionaryTransactions(data)))
  }

  if (showDetail) {
    return (
      <div className="detail-wrapper">
        <hr />
        <Details {...props} />
        <hr />
        <Transactions
          budgetCategory={titleize(copy.discretionary.title)}
          collection={collection}
        />
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return { ...state.budget.metadata, ...state.budget.discretionary }
}

export default connect(mapStateToProps)(DiscretionaryDetail)
