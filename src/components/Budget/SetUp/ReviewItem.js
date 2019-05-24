import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { addItem, editNew, markReviewed, requeue, updateExisting } from "../../../actions/budget/setup"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"

import Icon from "../../Icons/Icon"

const ReviewItem = ({ category, dayToDayItem, dispatch, item, month, newItem, prevMonthString, year }) => {
  const newMonthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })
  const { amount, selectedOption } = newItem

  const description = (item) => {
    if (item === undefined) {
      return ""
    }
    const adverb = item.monthly ? "monthly" : "day-to-day"
    const adjective = item.expense ? "expense" : "revenue"
    return `${adverb} ${adjective}`
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

  const setDefaultAmount = () => {
    const action = editNew({
      amount: MoneyFormatter(category.default_amount, { toFloat: true }),
      selectedOption: "defaultAmount",
    })
    dispatch(action)
  }

  const setPreviousAmount = () => {
    const action = editNew({
      amount: MoneyFormatter(item.amount, { toFloat: true }),
      selectedOption: "previousAmount",
    })
    dispatch(action)
  }

  const setPreviousSpent =() => {
    const action = editNew({
      amount: MoneyFormatter(item.spent, { toFloat: true }),
      selectedOption: "previousSpent",
    })
    dispatch(action)
  }

  const updateAmount = (e) => {
    const action = editNew({ amount: e.target.value })
    dispatch(action)
  }

  const createItem = () => {
    const body = {
      amount: decimalToInt(amount),
      month: month,
      year: year,
    }
    const url = ApiUrlBuilder(["budget/categories", category.id, "items"])
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => dispatch(addItem(data)))
      .then(() => dispatch(markReviewed({ id: item.id })))
  }

  const updateItem = () => {
    const body = {
      amount: (decimalToInt(amount) + dayToDayItem.amount),
    }
    const url = ApiUrlBuilder(["budget/categories", dayToDayItem.budget_category_id, "items", dayToDayItem.id])
    fetch(url,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(response => response.json())
      .then(data => dispatch(updateExisting(data)))
      .then(() => dispatch(markReviewed({ id: item.id })))
  }

  return (
    <div className="review-item-current">
      <div className="header">
        <div className="top-line"><strong>{item.name}</strong></div>
        <div className="top-line"><em>{description(item)}</em></div>
      </div>
      <div className="review-item-form">
        <Header
          dayToDayItem={dayToDayItem}
          newMonthString={newMonthString}
        />
        <Option
          amount={category.default_amount}
          label="Default Amount"
          onClick={setDefaultAmount}
          checked={selectedOption === "defaultAmount" ? "checked" : ""}
        />
        <Option
          amount={item.amount}
          label={`Budgeted in ${prevMonthString}`}
          onClick={setPreviousAmount}
          checked={selectedOption === "previousAmount" ? "checked" : ""}
        />
        <Option
          amount={item.spent}
          hidden={item.spent === 0}
          label={`${item.expense ? "Spent" : "Deposited"} in ${prevMonthString}`}
          onClick={setPreviousSpent}
          checked={selectedOption === "previousSpent" ? "checked" : ""}
        />
        <div className="input">
          <div className="label">
            <em>{dayToDayItem ? "Additional amount" : "Amount"} to include:</em>
          </div>
          <input
            onChange={updateAmount}
            value={amount}
          />
          <ConfirmationButton
            amount={amount}
            createItem={createItem}
            dayToDayItem={dayToDayItem}
            updateItem={updateItem}
          />
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

const Header = ({ dayToDayItem, newMonthString }) => {
  if (dayToDayItem) {
    return (
      <div>
        <p>
          You already included {MoneyFormatter(dayToDayItem.amount, { absolute: false })} for {dayToDayItem.name} in {newMonthString}'s budget.
        </p>
        <p>
          How much additional to include?
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <p>How much to include in {newMonthString}?</p>
      </div>
    )
  }
}

const Option = ({ amount, checked, hidden, label, onClick }) => {
  if (hidden) {
    return null
  } else {
    return (
      <div className="option">
        <div className="label">
          <input
            type="radio"
            name="review-option"
            onChange={onClick}
            checked={checked}
          />
          {label}:
        </div>
        <div className="amount">
          {MoneyFormatter(amount, { absolute: false })}
        </div>
      </div>
    )
  }
}

const ConfirmationButton = ({ amount, createItem, dayToDayItem, updateItem }) => {
  const onClick = dayToDayItem ? updateItem : createItem
  if (amount === "") {
    return null
  } else {
    return (
      <div className="confirm-button">
        <button onClick={onClick}>
          <Icon className="far fa-check-circle" />
          {" "}
          Include
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { item } = ownProps
  const { baseMonth, newMonth } = state.budget.setup
  const prevMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })
  const { newItem } = state.budget.setup.newMonth
  const category = state.budget.categories.collection.find(category => category.id === item.budget_category_id)
  const dayToDayItem = item.monthly ? null : newMonth.collection.find(i => i.budget_category_id === item.budget_category_id)

  return {
    category: category,
    dayToDayItem: dayToDayItem,
    item: item,
    month: newMonth.month,
    newItem: newItem,
    prevMonthString: prevMonthString,
    year: newMonth.year,
  }
}

export default connect(mapStateToProps)(ReviewItem)
