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
    amount,
    apiKey,
    collection,
    days_remaining,
    dispatch,
    fetchedTransactions,
    month,
    showDetail,
    total_remaining,
    total_days,
    year,
  } = props

  if (!showDetail) {
    return null
  }

  if (showDetail && !fetchedTransactions ) {
    const url = ApiUrlBuilder(["budget", "discretionary", "transactions"], { month: month, year: year, key: apiKey })
    const onSuccess = data => dispatch(fetchedDiscretionaryTransactions(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
  }

  const budgetedPerDay = Math.floor(amount / total_days)
  const remainingPerDay = Math.floor(total_remaining / days_remaining)

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
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
  const collection = state.budget.discretionary.collection.sort((a, b) => {
    if (a.clearance_date === b.clearance_date) {
      return 0
    } else if (a.clearance_date === null) {
      return b.clearance_date > today ? -1 : 1
    } else if (b.clearance_date === null) {
      return a.clearance_date > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.clearance_date > b.clearance_date) ? 1 : -1
    }
  })
  const { apiKey } = state.apiKey

  return {
    ...state.budget.metadata,
    ...state.budget.discretionary,
    apiKey: apiKey,
    collection: collection
  }
}

export default connect(mapStateToProps)(DiscretionaryDetail)
