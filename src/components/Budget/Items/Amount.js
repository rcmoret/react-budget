import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import { editMonthlyItem } from "../../../actions/budget"
import MonthlyAmountInput from "./MonthlyAmountInput"

const Amount = (props) => {
  const updateMonthlyItem = (e) => {
    e.preventDefault()
    props.dispatch(editMonthlyItem({ id: props.id, updateItem: true }))
  }

  const { absolute, amount } = props

  if (props.updateItem) {
    return (
      <MonthlyAmountInput {...props} />
    )
  } else {
    return (
      <span>
        <Link to="#" onClick={updateMonthlyItem}>
          {MoneyFormatter(amount, { absolute: absolute })}
        </Link>
      </span>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Amount)
