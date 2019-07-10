import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import { updateMetadata } from "../../../actions/budget/setup"

import Icon from "../../Icons/Icon"
import { Redirect } from "react-router"
import ReviewItem from "./ReviewItem"

const PreviousMonth = (props) => {
  const {
    collection,
    dispatch,
    filter,
    newMonth,
    prevMonthString,
    redirect,
    reviewItem,
    title,
  } = props

  return (
    <div className="previous-month-items">
      <h4>{prevMonthString}'s {title}</h4>
      <Review
        dispatch={dispatch}
        item={reviewItem}
        filter={filter}
        newMonth={newMonth}
        redirect={redirect}
      />
      {collection.map(item =>
        <Item key={item.id} item={item} />
      )}
    </div>
  )
}

const Review = ({ dispatch, filter, item, newMonth, redirect }) => {
  const { month, year } = newMonth
  const markComplete = (e) => {
    e.preventDefault()
    const url = ApiUrlBuilder(["intervals", month, year])
    const now = new Date()
    const body = JSON.stringify({ set_up_completed_at: now })
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then(response => response.json())
      .then(data => dispatch(updateMetadata(data)))
  }

  if (item && !newMonth.set_up_completed_at) {
    return (
      <ReviewItem item={item} />
    )
  } else if (!newMonth.set_up_completed_at && filter === "expenses") {
    return (
      <div className="review-item-current">
        <div className="review-item-form">
          <div className="confirm-button">
            <button
              onClick={markComplete}
            >
              <strong>Mark Setup Complete</strong>
              {" "}
              <Icon className="far fa-check-square" />
            </button>
          </div>
        </div>
      </div>
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

  let collection = state.budget.setup.baseMonth.collection
    .filter(filterFn)
    .sort((a, b) => {
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
    })
  const reviewItem = collection.shift()
  const { baseMonth } = state.budget.setup
  const prevMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })

  return {
    collection: collection,
    filter: filter,
    newMonth: state.budget.setup.newMonth,
    prevMonthString: prevMonthString,
    redirect: redirect,
    reviewItem: reviewItem,
    title: title,
  }
}

export default connect(mapStateToProps)(PreviousMonth)
