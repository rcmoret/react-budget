import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { editWeeklyItem } from "../../../actions/budget"
import MoneyFormatter from "../../../functions/MoneyFormatter"

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
