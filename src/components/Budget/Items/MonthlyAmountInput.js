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
    apiKey,
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
    const url = ApiUrlBuilder(["budget/categories", budget_category_id, "items", id], { key: apiKey })
    const body = JSON.stringify({ amount: decimalToInt(EvaluateInput(floatAmount)) })
    const onSuccess = data => {
      const action = updateMonthlyItem({
        ...data,
        floatAmount: null,
        updateItem: false,
        errors: {}
      })
      dispatch(action)
    }
    const onFailure = data => {
      const action = editMonthlyItem({
        id: id,
        ...data
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

const mapStateToProps = (state, ownProps) =>  ({ ...ownProps, apiKey: state.apiKey.apiKey })

export default connect(mapStateToProps)(MonthlyAmountInput)
