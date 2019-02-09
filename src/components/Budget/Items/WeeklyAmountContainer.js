import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { editWeeklyItem } from "../../../actions/budget"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

const AmountContainer = (props) => {
  const updateItem = (e) => {
    e.preventDefault()
    props.dispatch(editWeeklyItem({
      id: props.id,
      updateItem: true,
      showDetail: true,
    }))
  }

  const { absolute, amount, difference, expense, overUnderBudget, showDetail } = props
  const operator = !overUnderBudget ? "" : (expense ? "-" : "+")
  if (showDetail) {
    return (
      <span>
        <Link to="#" onClick={updateItem}>
          {MoneyFormatter(amount, { absolute: absolute })}
        </Link>
      </span>
    )
  } else {
    return (
      <span>
        <Link to="#" onClick={updateItem}>
          {operator} {MoneyFormatter(difference, { absolute: absolute })}
        </Link>
      </span>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(AmountContainer)
