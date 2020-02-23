import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Icon from "../../Icons/Icon"

const ClearedItems = ({ expenses, revenues, showCleared }) => {
  if (showCleared) {
    return (
      <div>
        <hr/>
        <h3>{titleize(copy.item.cleared)}</h3>
        <ClearedGroup
          collection={revenues}
          title={titleize(copy.category.revenues)}
        />
        <ClearedGroup
          collection={expenses}
          title={titleize(copy.category.expenses)}
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
  const {
    budgeted,
  } = copy.item

  const {
    deposited,
    minus,
    plus,
  } = copy.shared

  const operator = difference === 0 ? "" : (difference > 0 ? minus : plus)

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
        <em>{titleize(budgeted)}:</em>
        {MoneyFormatter(amount, { absolute: true })}
      </div>
      <div className="cleared-item-wrapper">
        <em>{titleize(expense ? copy.shared.spent : deposited)}:</em>
        {MoneyFormatter(spent, { absolute: true })}
      </div>
      <div className="cleared-item-wrapper">
        <em>{titleize(copy.shared.difference)}:</em>
        {operator}
        {MoneyFormatter(difference, { absolute: true })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { collection } = state.budget.monthly
  const { showCleared } = state.budget.menuOptions

  const sortByAmount = (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
  const sortByName = (a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    } else {
      return sortByAmount(a, b)
    }
  }

  const sortOrder = state.budget.menuOptions.sortOrder
  const sortFn = () => {
    switch (sortOrder) {
    case "byAmount":
      return sortByAmount
    case "byName":
      return sortByName
    default:
      return sortByName
    }
  }

  const revenues = collection.filter(item => !item.expense && !item.deletable)
    .sort(sortFn())
  const expenses = collection.filter(item => item.expense && !item.deletable)
    .sort(sortFn())

  return {
    expenses: expenses,
    revenues: revenues,
    showCleared: showCleared,
  }
}

export default connect(mapStateToProps)(ClearedItems)
