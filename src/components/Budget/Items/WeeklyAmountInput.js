import React from "react"
import { connect } from "react-redux"

import { editWeeklyItem, updateWeeklyItem } from "../../../actions/budget"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import { post } from "../../../functions/ApiClient"

import Errors from "../../Errors/Errors"
import { Link } from "react-router-dom"

const WeeklyAmountInput = (props) => {
  const {
    id,
    amount,
    dispatch,
    floatAmount,
    errors,
    month,
    name,
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

  const reset = () => {
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
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })
    const body = JSON.stringify({
      events: [
        {
          budget_item_id: id,
          amount: decimalToInt(EvaluateInput(floatAmount)),
          event_type: "item_adjust",
          month: month,
          year: year
        },
      ]
    })
    const event = EventMessageBuilder({
      eventType: "budget-item-update",
      id: id,
      month: month,
      year: year,
      category: name,
      newAmount: EvaluateInput(floatAmount),
      originalAmount: (amount / 100.0).toFixed(2)
    })
    const onSuccess = data => {
      const action = updateWeeklyItem({
        ...data[0].item,
        floatAmount: null,
        updateItem: false,
        errors: {}
      })
      dispatch(action)
    }
    const onFailure = data => {
      const action = editWeeklyItem({
        id: id,
        errors: { amount: data.errors[0]["adjust_item_form.0.amount"] },
      })
      dispatch(action)
    }
    if (EvaluateInput(floatAmount) !== ((amount / 100.0).toFixed(2))) {
      post(url, body, { onSuccess: onSuccess, onFailure: onFailure, event: event })
    } else {
      reset()
    }
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

const mapStateToProps = (state, ownProps) => (
  {
    month: state.budget.metadata.month,
    year: state.budget.metadata.year,
    ...ownProps,
  }
)

export default connect(mapStateToProps)(WeeklyAmountInput)
