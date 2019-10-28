import React from "react"
import { connect } from "react-redux"

import { fetchedWeeklyTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/RestApiClient"

import Details from "../Shared/Details"
import Transactions from "../Shared/Transactions"

const WeeklyDetail = (props) => {
  const {
    budgetCategoryId,
    budgetedPerDay,
    budgetedPerWeek,
    collection,
    dispatch,
    id,
    name,
    remainingPerDay,
    remainingPerWeek,
    showDetail,
    transactionCount,
  } = props

  if (!showDetail) {
    return null
  }

  if (collection.length < transactionCount) {
    const url = ApiUrlBuilder(
      ["budget", "categories", budgetCategoryId, "items", id, "transactions"]
    )
    const onSuccess = data => dispatch(fetchedWeeklyTransactions({
      id: id,
      collection: data
    }))

    get(url, onSuccess)
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

export default connect((_state, ownProps) => ownProps)(WeeklyDetail)
