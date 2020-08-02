import React from "react"

import * as DateHelpers from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import { budget as budgetCopy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

const Events = ({ events }) => {
  return events.map(event => {
    if (event.isTransaction) {
      return (
        <Transaction key={event.id} {...event} />
      )
    } else {
      return (
        <Event key={event.id} {...event} />
      )
    }
  })
}

const {
  minus,
  plus,
} = budgetCopy.shared

const Event = (props) => {
  const {
    amount,
    budgetedAmount,
    budget_item_event_type,
    remaining,
  } = props

  const items = [budgetCopy.eventLabels[budget_item_event_type], ""]
  const prevAmount = budgetedAmount - amount
  const prevRemaining = remaining - amount
  const operator = amount < 0 ? minus : plus
  const remainingString = `${MoneyFormatter(prevRemaining)} (${operator} ${MoneyFormatter(amount, { absolute: true })}) = ${MoneyFormatter(remaining)}`
  const budgetedString = `${MoneyFormatter(prevAmount)} (${operator} ${MoneyFormatter(amount, { absolute: true })}) = ${MoneyFormatter(budgetedAmount)}`

  return (
    <div className="budget-item-event">
      <Shared {...props} items={items} />
      <div className="budget-item-event-row bottom">
        <div className="budget-item-cell small amount">
          <Atom string={titleize(budgetCopy.shared.remaining)} />
          <Atom string={remainingString} />
        </div>
        <div className="budget-item-cell small amount">
          <Atom string={titleize(budgetCopy.item.budgeted)} />
          <Atom string={budgetedString} />
        </div>
      </div>
    </div>
  )
}

const Transaction = (props) => {
  const {
    account_name,
    amount,
    budgetedAmount,
    remaining,
  } = props
  const displayDescription = props.description || props.budgetCategory
  const prevRemaining = remaining + amount
  const items = [displayDescription, account_name]
  const operator = amount <= 0 ? plus : minus

  return (
    <div className="budget-item-event">
      <Shared {...props} items={items} />
      <div className="budget-item-event-row bottom">
        <div className="budget-item-cell small amount">
          <Atom string={titleize(budgetCopy.item.budgeted)} />
          <div className="budget-item-atom">
            {MoneyFormatter(budgetedAmount)}
          </div>
        </div>
        <div className="budget-item-cell small amount">
          <Atom string={titleize(budgetCopy.shared.remaining)} />
          <div className="budget-item-atom">
            {MoneyFormatter(prevRemaining)}
            {" "}
            ({operator} {MoneyFormatter(amount, { absolute: true })})
            {" "}
            =
            {" "}
            {MoneyFormatter(remaining)}
          </div>
        </div>
      </div>
    </div>
  )
}

const Shared = (props) => {
  const {
    amount,
    created_at,
    items,
  } = props

  return (
    <div className="budget-item-event-row top">
      <div className="budget-item-event-row-left">
        <div className="budget-item-cell created-at-date">
          <span className="long-date">
            {DateHelpers.fromDateString(created_at)}
          </span>
          <span className="short-date">
            {DateHelpers.fromDateString(created_at, { format: "m/d" })}
          </span>
        </div>
        {items.map((item, index) => (
          <div className="budget-item-cell" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="budget-item-cell amount">
        {MoneyFormatter(amount)}
      </div>
    </div>
  )
}

const Atom = ({ string }) => (
  <div className="budget-item-atom">
    {string}
  </div>
)

export default Events