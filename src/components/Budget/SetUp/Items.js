import React from "react"

import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import Discretionary from "./Discretionary"

export default ({ collection, discretionary, dispatch, isReady, monthString }) => {
  const revenues = collection.filter(item => !item.expense)
  const expenses = collection.filter(item => item.expense)

  if (isReady) {
    return (
      <div className="new-month-items">
        <h4>{monthString} Items</h4>
        <div className="setup-title">
          <strong>Revenues</strong>
        </div>
        {revenues.map(item =>
          <Item
            key={item.id}
            dispatch={dispatch}
            {...item}
          />
        )}
        <div className="setup-title">
          <strong>Expenses</strong>
        </div>
        {expenses.map(item =>
          <Item
            key={item.id}
            dispatch={dispatch}
            {...item}
          />
        )}
        <Discretionary
          amount={discretionary}
        />
      </div>
    )
  } else {
    return null
  }
}

const Item = ({ dispatch, name, amount }) => {
  return (
    <div className="new-month-item">
      <div className="name">
        {name}
      </div>
      <div className="amount">
        {MoneyFormatter(amount, { absolute: false })}
      </div>
    </div>
  )
}
