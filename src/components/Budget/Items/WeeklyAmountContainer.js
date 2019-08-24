import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { editWeeklyItem } from "../../../actions/budget"

import { Link } from "react-router-dom"
import MoneyFormatter from "../../../functions/MoneyFormatter"

const AmountContainer = (props) => {
  const {
    id,
    absolute,
    amount,
    difference,
    errors,
    expense,
    overUnderBudget,
    showDetail,
  } = props

  const {
    minus,
    plus,
  } = copy.shared

  const updateItem = (e) => {
    e.preventDefault()
    props.dispatch(editWeeklyItem({
      id: id,
      updateItem: true,
      showDetail: true,
      errors: (errors || {})
    }))
  }

  const operator = !overUnderBudget ? "" : (expense ? minus : plus)
  if (showDetail) {
    return (
      <div className="update-amount">
        <Link to="#" onClick={updateItem}>
          {MoneyFormatter(amount, { absolute: absolute })}
        </Link>
      </div>
    )
  } else {
    return (
      <div className="update-amount">
        <Link to="#" onClick={updateItem}>
          {operator} {MoneyFormatter(difference, { absolute: absolute })}
        </Link>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(AmountContainer)
