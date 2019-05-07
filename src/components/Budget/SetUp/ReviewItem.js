import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

const ReviewItem = ({ amount, category, item, newMonthString, prevMonthString }) => {
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

  return (
    <div className="review-item">
      <div className="header">
        <div className="top-line"><strong>{item.name}</strong></div>
        <div className="top-line"><em>({description(item)})</em></div>
      </div>
      <div className="review-item-form">
        <p>How much to include in {newMonthString}?</p>
        <div className="option">
          <div className="label">
            Default Amount:
          </div>
          <div className="amount">
            {MoneyFormatter(category.default_amount, { absolute: false })}
          </div>
        </div>
        <div className="option">
          <div className="label">
            Budgeted in {prevMonthString}:
          </div>
          <div className="amount">
            {MoneyFormatter(item.amount, { absolute: false })}
          </div>
        </div>
        <div className="option">
          <div className="label">
            {item.expense ? "Spent" : "Deposited"} in {prevMonthString}:
          </div>
          <div className="amount">
            {MoneyFormatter(item.spent, { absolute: false })}
          </div>
        </div>
        <input
          onChange={onAmountChange}
          value={amount}
        />
      </div>
    </div>
  )
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
