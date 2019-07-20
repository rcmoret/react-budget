import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { fetchedWeeklyTransactions } from "../../../actions/budget"

import Details from "../Shared/Details"
import Transactions from "../Shared/Transactions"

const WeeklyDetail = (props) => {
  const {
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

  if (collection.length < transaction_count && showDetail) {
    const url = ApiUrlBuilder(
      ["budget", "categories", budget_category_id, "items", id, "transactions"]
    )
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(
        fetchedWeeklyTransactions({ id: id, collection: data }))
      )
  }

  if (showDetail) {
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
  } else {
    return null
  }
}

export default connect((_state, ownProps) => ownProps)(WeeklyDetail)
