import React from "react"
import { connect } from "react-redux"

import { editMonthlyItem, updateMonthlyItem } from "../../../actions/budget"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import { put } from "../../../functions/ApiClient"

import { Link } from "react-router-dom"

const MonthlyAmountInput = (props) => {
  const {
    id,
    amount,
    budget_category_id,
    dispatch,
    floatAmount,
  } = props

  const handleChange = (e) => {
    e.preventDefault()
    const action = editMonthlyItem({ id: id, floatAmount: e.target.value })
    dispatch(action)
  }

  const reset = (e) => {
    e.preventDefault()
    const action = editMonthlyItem({
      id: id,
      floatAmount: (amount / 100.0).toFixed(2),
      updateItem: false,
    })
    dispatch(action)
  }

  const handleKeyDown = (e) => {
    if (e.which !== 13) {
      return
    } else if (e.target.value === (amount / 100.0).toFixed(2)) {
      reset(e)
    } else {
      saveChange(e)
    }
  }
  const saveChange = (e) => {
    e.preventDefault()
    put(
      ApiUrlBuilder(["budget/categories", budget_category_id, "items", id]),
      JSON.stringify({ amount: decimalToInt(floatAmount) }),
      (data) => dispatch(updateMonthlyItem({...data, floatAmount: null, updateItem: false })),
    )
  }

  return (
    <div className="budget-item-amount">
      <input
        name="amount"
        value={floatAmount}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autcomplete="false"
        autoFocus
      />
      {" "}
      <Link to="#" onClick={saveChange} className="fas fa-check" />
      {" "}
      <Link to="#" onClick={reset} className="fas fa-times" />
    </div>
  )
}

const mapStateToProps = (state, ownProps) =>  ownProps

export default connect(mapStateToProps)(MonthlyAmountInput)
