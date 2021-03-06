import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { addItem, editNew, markReviewed, requeue, updateExisting } from "../../../actions/budget/setup"

import * as dateFormatter from "../../../functions/DateFormatter"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import MoneyFormatter from "../../../functions/MoneyFormatter"
import { post } from "../../../functions/ApiClient"

import Icon from "../../Icons/Icon"

const ReviewItem = (props) => {
  const {
    additional,
    amountToInclude,
    nOfTotal,
  } = copy.setup

  const {
    category,
    count,
    dayToDayItem,
    dispatch,
    item,
    month,
    newItem,
    number,
    prevMonthString,
    year,
  } = props

  const newMonthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })
  const { amount, selectedOption } = newItem

  const description = (item) => {
    if (item === undefined) {
      return ""
    }
    const adverb = item.monthly ? copy.category.monthly : copy.category.weekly
    const adjective = item.expense ? copy.category.expense : copy.category.revenue
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
    const amount = EvaluateInput(e.target.value)
    const action = editNew({
      amount: amount,
      selectedOption: "",
    })
    dispatch(action)
  }

  const createItem = () => {
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })
    const body = JSON.stringify({
      events: [
        {
          amount: decimalToInt(amount),
          budget_category_id: category.id,
          event_type: "setup_item_create",
          month: month,
          year: year,
        },
      ],
    })
    const onSuccess = data => {
      dispatch(addItem(data[0].item))
      dispatch(markReviewed({ id: item.id }))
    }
    const event = data => EventMessageBuilder({ eventType: "budget-item-create", item: data[0].item })
    post(url, body, { events: [event], onSuccess: onSuccess })
  }

  const updateItem = () => {
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })
    const updatedAmount = decimalToInt(amount) + dayToDayItem.amount
    const event = EventMessageBuilder({
      eventType: "budget-item-update",
      id: dayToDayItem.id,
      category: dayToDayItem.name,
      month: month,
      year: year,
      originalAmount: (dayToDayItem.amount / 100.0),
      newAmount: (updatedAmount / 100.0),
    })
    const body = JSON.stringify({
      events: [
        {
          event_type: "setup_item_adjust",
          amount: updatedAmount,
          budget_item_id: dayToDayItem.id
        },
      ]
    })
    const onSuccess = data => {
      dispatch(updateExisting(data))
      dispatch(markReviewed({ id: item.id }))
    }
    post(url, body, { onSuccess: onSuccess, events: [event] })
  }

  return (
    <div className="review-item-current">
      <div className="header">
        <div className="top-line"><strong>{item.name}</strong></div>
        <div className="top-line">
          {nOfTotal(number, count)}
          {" "}
          <em>
            {description(item)}
          </em>
        </div>
      </div>
      <div className="review-item-form">
        <Header
          dayToDayItem={dayToDayItem}
          newMonthString={newMonthString}
        />
        <Option
          amount={category.default_amount}
          label={titleize(copy.category.defaultAmount)}
          onClick={setDefaultAmount}
          checked={selectedOption === "defaultAmount" ? "checked" : ""}
        />
        <Option
          amount={item.amount}
          label={`${titleize(copy.item.budgeted)} ${copy.shared.in} ${prevMonthString}`}
          onClick={setPreviousAmount}
          checked={selectedOption === "previousAmount" ? "checked" : ""}
        />
        <Option
          amount={item.spent}
          hidden={item.spent === 0}
          label={`${titleize(item.expense ? copy.shared.spent : copy.shared.deposited)} ${copy.shared.in} ${prevMonthString}`}
          onClick={setPreviousSpent}
          checked={selectedOption === "previousSpent" ? "checked" : ""}
        />
        <div className="input">
          <div className="label">
            <em>{dayToDayItem ? titleize(additional) : amountToInclude}: </em>
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
        <Total
          amount={amount}
          dayToDayItem={dayToDayItem}
        />
        <hr />
        <div className="extra-options">
          <button
            className="requeue"
            onClick={requeueItem}
          >
            {titleize(copy.setup.requeue)}
            {" "}
            <Icon className="fas fa-retweet" />
          </button>
          <button
            className="ignore"
            onClick={ignore}
          >
            {titleize(copy.setup.ignore)}
            {" "}
            <Icon className="far fa-times-circle" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Header = ({ dayToDayItem, newMonthString }) => {
  const {
    alreadyIncluded,
    howMuchAdditional,
    howMuchToInclude,
  } = copy.setup

  if (dayToDayItem) {
    return (
      <div>
        <p>
          {alreadyIncluded(MoneyFormatter(dayToDayItem.amount, { absolute: false }), dayToDayItem.name, newMonthString)}
        </p>
        <p>
          {howMuchAdditional}
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <p>{howMuchToInclude(newMonthString)}</p>
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
  const { include } = copy.setup
  const onClick = dayToDayItem ? updateItem : createItem
  if (amount === "") {
    return null
  } else {
    return (
      <div className="confirm-button">
        <button onClick={onClick}>
          <Icon className="far fa-check-circle" />
          {" "}
          {titleize(include)}
        </button>
      </div>
    )
  }
}

const Total = ({ amount, dayToDayItem }) => {
  const { total } = copy.shared
  if (dayToDayItem) {
    return (
      <div className="option">
        <div className="label">
          <em>{titleize(total)}: </em>
        </div>
        <div className="amount">
          {MoneyFormatter((((parseFloat(amount) || 0) * 100) + dayToDayItem.amount), { absolute: false })}
        </div>
      </div>
    )
  } else {
    return null
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
