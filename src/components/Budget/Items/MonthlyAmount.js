import React from "react";
import { connect } from "react-redux"

import { editMonthlyItem } from "../../../actions/budget"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import { Link } from "react-router-dom"
import MonthlyAmountInput from "./MonthlyAmountInput"

const Amount = (props) => {
  const {
    id,
    absolute,
    amount,
    budget_category_id,
    dispatch,
    errors,
    updateItem,
  } = props

  const floatAmount = props.floatAmount || (amount / 100.0).toFixed(2)

  const updateMonthlyItem = (e) => {
    e.preventDefault()
    const action = editMonthlyItem({
      id: id,
      updateItem: true,
      errors: {}
    })
    dispatch(action)
  }

  if (updateItem) {
    return (
      <MonthlyAmountInput
        id={id}
        amount={amount}
        budget_category_id={budget_category_id}
        errors={errors}
        floatAmount={floatAmount}
      />
    )
  } else {
    return (
      <div className="update-amount">
        <Link to="#" onClick={updateMonthlyItem}>
          {MoneyFormatter(amount, { absolute: absolute })}
        </Link>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Amount)
