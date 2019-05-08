import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import { markReviewed, requeue } from "../../../actions/budget/setup"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import Icon from "../../Icons/Icon"

const ReviewItem = ({ amount, category, dispatch, item, newMonthString, prevMonthString }) => {
  const description = (item) => {
    if (item === undefined) {
      return ""
    }
    const adverb = item.monthly ? "monthly" : "weekly"
    const adjective = item.expense ? "expense" : "revenue"
    return `${adverb} ${adjective}`
  }

  const onAmountChange = (e) => {
    e.preventDefault()
  }

  const ignore = () => {
    const action = markReviewed({ id: item.id })
    dispatch(action)
  }

  const requeueItem = () => {
    const requeuedAt = Date.now()
    const action = requeue({ id: item.id, requeuedAt: requeuedAt })
    dispatch(action)
  }

  return (
    <div className="review-item-current">
      <div className="header">
        <div className="top-line"><strong>{item.name}</strong></div>
        <div className="top-line"><em>{description(item)}</em></div>
      </div>
      <div className="review-item-form">
        <p>How much to include in {newMonthString}?</p>
        <Option
          amount={category.default_amount}
          label="Default Amount"
        />
        <Option
          amount={item.amount}
          label={`Budgeted in ${prevMonthString}`}
        />
        <Option
          amount={item.spent}
          label={`${item.expense ? "Spent" : "Deposited"} in ${prevMonthString}`}
          hidden={item.spent === 0}
        />
        <div className="input">
          <div className="label">
            <em>Amount to include:</em>
          </div>
          <input
            onChange={onAmountChange}
            value={amount}
          />
          <div className="confirm-button">
            <Icon className="far fa-check-circle" />
          </div>
        </div>
        <hr />
        <div className="extra-options">
          <button
            className="requeue"
            onClick={requeueItem}
          >
            Requeue
            {" "}
            <Icon className="fas fa-retweet" />
          </button>
          <button
            className="ignore"
            onClick={ignore}
          >
            Don't Include
            {" "}
            <Icon className="far fa-times-circle" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Option = ({ amount, hidden, label }) => {
  if (hidden) {
    return null
  } else {
    return (
      <div className="option">
        <div className="label">
          <input type="radio" name="review-option" />
          {label}:
        </div>
        <div className="amount">
          {MoneyFormatter(amount, { absolute: false })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps
  const { baseMonth, newMonth } = state.budget.setup
  const prevMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })
  const newMonthString = dateFormatter.formatted({ month: newMonth.month, year: newMonth.year, format: "monthYear" })
  const { amount } = state.budget.setup.newMonth.newItem
  const category = state.budget.categories.collection.find(category => category.id === item.budget_category_id)

  return {
    category: category,
    item: item,
    newMonthString: newMonthString,
    prevMonthString: prevMonthString,
    amount: amount,
  }
}

export default connect(mapStateToProps)(ReviewItem)
