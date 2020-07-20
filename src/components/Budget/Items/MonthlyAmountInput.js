import React from "react"
import { connect } from "react-redux"

import { editMonthlyItem, updateMonthlyItem } from "../../../actions/budget"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
import { put } from "../../../functions/ApiClient"

import Errors from "../../Errors/Errors"
import { Link } from "react-router-dom"

const MonthlyAmountInput = (props) => {
  const {
    id,
    amount,
    budget_category_id,
    dispatch,
    errors,
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
    const url = ApiUrlBuilder({
      route: "budget-item-show",
      id: id,
      budgetCategoryId: budget_category_id,
    })
    const body = JSON.stringify({ amount: decimalToInt(EvaluateInput(floatAmount)) })
    const onSuccess = data => {
      const action = updateMonthlyItem({
        ...data,
        floatAmount: null,
        updateItem: false,
        errors: [],
      })
      dispatch(action)
    }
    const onFailure = data => {
      const errors = data.errors.reduce((acc, error) => {
        Object.entries(error).map(arr => {
          const key = arr[0]
          const messages = arr[1]
          const existingMessages = acc[key] || []
          acc[key] = [...existingMessages, ...messages]
          return acc
        })
        return acc
      }, {})

      const action = editMonthlyItem({
        id: id,
        errors: errors,
      })
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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

const mapStateToProps = (_state, ownProps) =>  ownProps

export default connect(mapStateToProps)(MonthlyAmountInput)
