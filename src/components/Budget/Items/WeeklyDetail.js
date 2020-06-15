import React from "react"
import { connect } from "react-redux"

import { fetchedWeeklyTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"

import Details from "../Shared/Details"
import Transactions from "../Shared/Transactions"

const WeeklyDetail = (props) => {
  const {
    apiKey,
    budget_category_id,
    budgetedPerDay,
    budgetedPerWeek,
    collection,
    dispatch,
    id,
    name,
    remainingPerDay,
    remainingPerWeek,
    showDetail,
    transaction_count,
  } = props

  if (!showDetail) {
    return null
  }

  if (collection.length < transaction_count) {
    const url = ApiUrlBuilder(
      ["budget", "categories", budget_category_id, "items", id, "transactions"],
      { key: apiKey }
    )
    const onSuccess = data => dispatch(fetchedWeeklyTransactions({
      id: id,
      collection: data
    }))
    const onFailure = data => console.log(data)

    get(url, onSuccess, onFailure)
  }

  return (
    <div className="detail-wrapper">
      <hr />
      <Details
        budgetedPerDay={budgetedPerDay}
        budgetedPerWeek={budgetedPerWeek}
        remainingPerDay={remainingPerDay}
        remainingPerWeek={remainingPerWeek}
      />
      <hr />
      <Transactions
        budgetCategory={name}
        collection={collection}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)

  const collection = ownProps.collection.sort((a, b) => {
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
    ...ownProps,
    apiKey: apiKey,
    collection: collection
  }
}

export default connect(mapStateToProps)(WeeklyDetail)
