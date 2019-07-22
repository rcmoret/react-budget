import React from "react"
import { connect } from "react-redux"

import MoneyFormatter from "../../../functions/MoneyFormatter"

import Icon from "../../Icons/Icon"

const ClearedItems = ({ expenses, revenues, showCleared }) => {
  if (showCleared) {
    return (
      <div>
        <hr/>
        <h3>Cleared</h3>
        <ClearedGroup
          collection={revenues}
          title="Revenues"
        />
        <ClearedGroup
          collection={expenses}
          title="Expenses"
        />
      </div>
    )
  } else {
    return null
  }
}

const ClearedGroup = ({ collection, title }) => {
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <h4>{title}</h4>
        {collection.map(item =>
          <ClearedItem
            key={item.id}
            {...item}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

const ClearedItem = ({ amount, expense, difference, icon_class_name, name, spent }) => {
  const operator = difference === 0 ? "" : (difference > 0 ? "-" : "+")

  return (
    <div className="budget-item-cleared">
      <div className="cleared-item-name">
        <div>
          <Icon className="fas fa-caret-down" />
          {" "}
          <strong>{name}</strong>
          {" "}
          <Icon className={icon_class_name} />
        </div>
      </div>
      <div className="cleared-item-wrapper">
        <em>Budgeted:</em>
        {MoneyFormatter(amount, { absolute: true })}
      </div>
      <div className="cleared-item-wrapper">
        <em>{expense ? "Spent" : "Deposited"}:</em>
        {MoneyFormatter(spent, { absolute: true })}
      </div>
      <div className="cleared-item-wrapper">
        <em>Difference:</em>
        {operator} {MoneyFormatter(difference, { absolute: true })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { collection } = state.budget.monthly
  const { showCleared } = state.budget.menuOptions
  const revenues = collection.filter(item => !item.expense && !item.deletable)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))
  const expenses = collection.filter(item => item.expense && !item.deletable)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))

  return {
    expenses: expenses,
    revenues: revenues,
    showCleared: showCleared,
  }
}

export default connect(mapStateToProps)(ClearedItems)
