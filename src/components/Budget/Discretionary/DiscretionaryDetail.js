import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { fetchedDiscretionaryTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/RestApiClient"

import Details from "../Shared/Details"
import Transactions from "./../Shared/Transactions"

const DiscretionaryDetail = (props) => {
  const {
    amount,
    collection,
    daysRemaining,
    dispatch,
    fetchedTransactions,
    month,
    showDetail,
    totalRemaining,
    totalDays,
    year,
  } = props

  if (!showDetail) {
    return null
  }

  if (showDetail && !fetchedTransactions ) {
    const url = ApiUrlBuilder(["budget", "discretionary", "transactions"], { month: month, year: year })
    get(url, data => dispatch(fetchedDiscretionaryTransactions(data)))
  }

  const budgetedPerDay = Math.floor(amount / totalDays)
  const remainingPerDay = Math.floor(totalRemaining / daysRemaining)

  return (
    <div className="detail-wrapper">
      <hr />
      <Details
        budgetedPerDay={budgetedPerDay}
        budgetedPerWeek={budgetedPerDay * 7}
        remainingPerDay={remainingPerDay}
        remainingPerWeek={remainingPerDay * 7}
      />
      <hr />
      <Transactions
        budgetCategory={titleize(copy.discretionary.title)}
        collection={collection}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { ...state.budget.metadata, ...state.budget.discretionary }
}

export default connect(mapStateToProps)(DiscretionaryDetail)
