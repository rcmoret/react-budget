import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import * as dateFormatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Discretionary from "./Discretionary"

const Items = ({ collection, discretionary, month, year }) => {
  const monthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })

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

  return (
    <div className="new-month-items">
      <h4>{monthString} {titleize(copy.item.items)}</h4>
      <Discretionary
        amount={discretionary}
      />
      <div className="setup-title">
        <strong>{titleize(copy.category.revenues)}</strong>
      </div>
      {revenues.map(item =>
        <Item
          key={item.id}
          {...item}
        />
      )}
      <div className="setup-title">
        <strong>{titleize(copy.category.expenses)}</strong>
      </div>
      {expenses.map(item =>
        <Item
          key={item.id}
          {...item}
        />
      )}
    </div>
  )
}

const Item = ({ amount, name }) => {
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

const mapStateToProps = (state) => {
  const newMonth = state.budget.setup.newMonth
  const { collection, month, year } = newMonth
  const discretionary = collection.reduce((acc, item) => acc += item.amount, 0)

  return {
    collection: collection,
    discretionary: discretionary,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(Items)
