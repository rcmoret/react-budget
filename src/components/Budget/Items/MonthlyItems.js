import React from "react"
import { connect } from "react-redux"

import ClearedItems from "./ClearedItems"
import MonthlyGroup from "./MonthlyGroup"
import MonthlyHeader from "./MonthlyHeader"

const MonthlyItems = (props) => (
  <div className="monthly-items">
    <MonthlyHeader />
    <MonthlyGroup collection={props.revenues} title="Revenues" />
    <MonthlyGroup collection={props.expenses} title="Expenses" />
    <ClearedItems />
  </div>
)

const mapStateToProps = (state) => {
  const { collection } = state.budget.monthly
  const { showAccruals } = state.budget.menuOptions
  const accrualFilter = (item) => !item.accrual || showAccruals

  const revenues = collection
    .filter(item => !item.expense && item.deletable)
    .filter(accrualFilter)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))

  const expenses = collection
    .filter(item => item.expense && item.deletable)
    .filter(accrualFilter)
    .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))

  return {
    revenues: revenues,
    expenses: expenses,
  }
}

export default connect(mapStateToProps)(MonthlyItems)
