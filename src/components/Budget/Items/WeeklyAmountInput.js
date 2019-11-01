import React from "react"
import { connect } from "react-redux"

import { editWeeklyItem, updateWeeklyItem } from "../../../actions/budget"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import { put } from "../../../functions/RestApiClient"

import Errors from "../../Errors/Errors"
import { Link } from "react-router-dom"

const WeeklyAmountInput = (props) => {
  const {
    id,
    amount,
    budgetCategoryId,
    dispatch,
    floatAmount,
    errors,
    month,
    spent,
    year,
  } = props

  const handleChange = (e) => {
    e.preventDefault()
    const difference = decimalToInt(e.target.value) - spent
    const action = editWeeklyItem({
      id: id,
      floatAmount: e.target.value,
      difference: difference
    })
    dispatch(action)
  }

  const reset = (e) => {
    e.preventDefault()
    const difference = amount - spent
    const action = editWeeklyItem({
      id: id,
      floatAmount: (amount / 100.0).toFixed(2),
      difference: difference,
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
    const url = ApiUrlBuilder(["budget/categories", budgetCategoryId, "items", id])
    const body = JSON.stringify({
      amount: decimalToInt(floatAmount),
      month: month,
      year: year
    })
    const onSuccess = data => {
      const action = updateWeeklyItem({
        ...data,
        floatAmount: null,
        updateItem: false,
        errors: {}
      })
      dispatch(action)
    }
    const onFailure = data => {
      const action = editWeeklyItem({ id: id, ...data })
      dispatch(action)
    }
    put(url, body, onSuccess, onFailure)
  }

  return (
    <div>
      <div className="budget-item-amount">
        <input
          autcomplete="false"
          autoFocus
          className={errors.amount ? "errors" : ""}
          name="amount"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={floatAmount}
        />
        {" "}
        <Link to="#" onClick={saveChange} className="fas fa-check" />
        {" "}
        <Link to="#" onClick={reset} className="fas fa-times" />
      </div>
      <Errors errors={errors.amount || []} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    month: state.budget.metadata.month,
    year: state.budget.metadata.year,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(WeeklyAmountInput)
