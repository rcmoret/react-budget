import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import ReviewItem from "./ReviewItem"

const PreviousMonth = ({ collection, isReady, prevMonthString, reviewItem }) => {
  if (isReady) {
    return (
      <div className="previous-month-items">
        <h4>{prevMonthString}'s Items</h4>
        <ReviewItem item={reviewItem} />
        {collection.map(item =>
          <Item key={item.id} item={item} />
        )}
      </div>
    )
  } else {
    return null
  }
}

const Item = ({ item }) => (
  <div className="review-item-queued">
    <div className="label">
      {item.name}
    </div>
    <div className="amount">
      {MoneyFormatter(item.amount, { absolute: false })}
    </div>
  </div>
)

const mapStateToProps = (state) => {
  let collection = state.budget.setup.baseMonth.collection
    .filter(item => !item.reviewed)
    .sort((a, b) => {
      if (a.expense === b.expense) {
        return Math.abs(a.amount) > Math.abs(b.amount) ? -1 : 1
      } else {
        return a.expense ? 1 : -1
      }
    })
  const reviewItem = collection.shift()
  const { baseMonth } = state.budget.setup
  const prevMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })

  return {
    collection: collection,
    isReady: state.budget.setup.newMonth.isReady,
    prevMonthString: prevMonthString,
    reviewItem: reviewItem,
  }
}

export default connect(mapStateToProps)(PreviousMonth)
