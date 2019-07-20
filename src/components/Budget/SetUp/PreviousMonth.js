import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import { Redirect } from "react-router"
import ReviewItem from "./ReviewItem"

const PreviousMonth = (props) => {
  const {
    collection,
    count,
    dispatch,
    filter,
    newMonth,
    number,
    prevMonthString,
    redirect,
    reviewItem,
    title,
  } = props

  return (
    <div className="previous-month-items">
      <h4>{prevMonthString}</h4>
      <h5>{title}</h5>
      <Review
        count={count}
        dispatch={dispatch}
        item={reviewItem}
        filter={filter}
        newMonth={newMonth}
        number={number}
        redirect={redirect}
      />
      {collection.map(item =>
        <Item key={item.id} item={item} />
      )}
    </div>
  )
}

const Review = ({ count, item, newMonth, number, redirect }) => {
  if (item && !newMonth.set_up_completed_at) {
    return (
      <ReviewItem
        count={count}
        item={item}
        number={number}
      />
    )
  } else {
    return (
      <Redirect to={redirect} />
    )
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

const mapStateToProps = (state, ownProps) => {
  const {
    filter,
    redirect,
    title,
  } = ownProps

  const filterFn = (item) => {
    if (item.reviewed) {
      return false
    }
    if (filter === "revenue") {
      return !item.expense
    }
    return item.expense
  }

  const fullCollection = state.budget.setup.baseMonth.collection
  const sortFn = (a, b) => {
    if (a.requeuedAt && b.requeuedAt) {
      return a.requeuedAt > b.requeuedAt ? 1 : -1
    } else if (a.requeuedAt && !b.requeuedAt) {
      return 1
    } else if (!a.requeuedAt && b.requeuedAt) {
      return -1
    } else if (a.expense === b.expense) {
      return Math.abs(a.amount) >= Math.abs(b.amount) ? -1 : 1
    } else {
      return a.expense ? 1 : -1
    }
  }
  let collection = fullCollection
    .filter(filterFn)
    .sort(sortFn)
  const reviewItem = collection.shift()
  const { baseMonth } = state.budget.setup
  const prevMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })
  const id = reviewItem ? reviewItem.id : 0
  const name = reviewItem ? reviewItem.name : ""
  const count = fullCollection.filter(item => item.name === name).length
  const number = fullCollection
    .filter(item => item.name === name)
    .sort(sortFn)
    .map(item => item.id)
    .indexOf(id)

  return {
    collection: collection,
    count: count,
    filter: filter,
    newMonth: state.budget.setup.newMonth,
    number: (number + 1),
    prevMonthString: prevMonthString,
    redirect: redirect,
    reviewItem: reviewItem,
    title: title,
  }
}

export default connect(mapStateToProps)(PreviousMonth)
