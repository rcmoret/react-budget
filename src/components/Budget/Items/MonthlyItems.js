import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import ClearedItems from "./ClearedItems"
import MonthlyGroup from "./MonthlyGroup"
import MonthlyHeader from "./MonthlyHeader"

const MonthlyItems = (props) => (
  <div className="monthly-items">
    <MonthlyHeader />
    <MonthlyGroup
      collection={props.revenues}
      title={titleize(copy.category.revenues)}
    />
    <MonthlyGroup
      collection={props.expenses}
      title={titleize(copy.category.expenses)}
    />
    <ClearedItems />
  </div>
)

const mapStateToProps = (state) => {
  const { collection } = state.budget.monthly
  const { showAccruals } = state.budget.menuOptions
  const accrualFilter = (item) => !item.accrual || item.matureAccrual || showAccruals

  const sortByAmount = (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
  const sortByName = (a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    } else {
      sortByAmount(a, b)
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

  const revenues = collection
    .filter(item => !item.expense && item.deletable)
    .filter(accrualFilter)
    .sort(sortFn())

  const expenses = collection
    .filter(item => item.expense && item.deletable)
    .filter(accrualFilter)
    .sort(sortFn())

  return {
    revenues: revenues,
    expenses: expenses,
  }
}

export default connect(mapStateToProps)(MonthlyItems)
