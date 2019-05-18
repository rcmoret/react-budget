import React from "react"

import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import Discretionary from "./Discretionary"

export default ({ collection, discretionary, dispatch, isReady, monthString }) => {
  const sortFn = (a, b) => {
    if (a.budget_category_id !== b.budget_cateogry_id) {
      return a.name < b.name ? -1 : 1
    } else {
      if (a.amount === b.amount) {
        return a.id - b.id
      } else {
        return Math.abs(a.amount) - Math.abs(b.amount)
      }
    }
  }
  const revenues = collection.filter(item => !item.expense).sort(sortFn)
  const expenses = collection.filter(item => item.expense).sort(sortFn)

  if (isReady) {
    return (
      <div className="new-month-items">
        <h4>{monthString} Items</h4>
        <Discretionary
          amount={discretionary}
        />
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
