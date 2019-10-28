import React from "react"
import { connect } from "react-redux"

import { fetchedWeeklyTransactions } from "../../../actions/budget"

import { getTransactions } from "./graphqlQueries"

import Details from "../Shared/Details"
import Transactions from "../Shared/Transactions"

const WeeklyDetail = (props) => {
  const {
    id,
    budgetCategoryId,
    budgetedPerDay,
    budgetedPerWeek,
    collection,
    dispatch,
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
    const onSuccess = result => dispatch(fetchedWeeklyTransactions({
      id: id,
      collection: result.data.budgetItem.transactions
    }))

    getTransactions({
      itemId: id,
      categoryId: budgetCategoryId,
      onSuccess: onSuccess
    })
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
