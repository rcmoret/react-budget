import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  addMonthlyItem,
  editNewMonthlyItem,
  toggleMonthlyItemForm,
} from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import { post } from "../../../functions/ApiClient"

import Errors from "../../Errors/Errors"
import Select from "react-select"

const MonthlyItemForm = (props) => {
  const {
    amount,
    budget_category_id,
    categories,
    dispatch,
    errors,
    month,
    options,
    showForm,
    value,
    year,
  } = props

  const onCategoryChange = (e) => {
    const category = categories.find(category => category.id === e.value)
    const action = editNewMonthlyItem({
      budget_category_id: e.value,
      amount: parseFloat(category.default_amount / 100.0).toFixed(2)
    })
    dispatch(action)
  }

  const onAmountChange = (e) => {
    const action = editNewMonthlyItem({ amount: e.target.value })
    dispatch(action)
  }

  const handleKeyDown = (e) => {
    if (e.which === 13) {
      onSave(e)
    }
  }

  const onSave = (e) => {
    e.preventDefault()
    const url = ApiUrlBuilder({ route: "budget-items-events-index" })
    const body = JSON.stringify({
      events:[
        {
          amount: decimalToInt(EvaluateInput(amount)),
          budget_category_id: budget_category_id,
          event_type: "item_create",
          month: month,
          year: year,
        }
      ]
    })
    const onSuccess = data => {
      dispatch(addMonthlyItem(data[0].item))
      dispatch(toggleMonthlyItemForm({ showForm: false }))
      dispatch(editNewMonthlyItem({ amount: "", budget_category_id: null }))
    }
    const onFailure = data => {
      const action = editNewMonthlyItem({
        errors: [
          { amount: data.errors[0]["create_item_form.0.amount"] }
        ]
      })
      dispatch(action)
    }
    const event = data => EventMessageBuilder({ eventType: "budget-item-create", item: data[0].item })
    post(url, body, { events: [event], onSuccess: onSuccess, onFailure: onFailure })
  }

  if (showForm) {
    return (
      <div className="new-budget-item">
        <div className="select-wrapper">
          <Select
            value={value}
            placeholder="Category"
            options={options}
            onChange={onCategoryChange}
            className="budget-category-select-container"
            classNamePrefix="budget-category-select"
          />
        </div>
        <div>
          <input
            name="amount"
            className={errors.length > 0 ? "errors new-item-amount" : "new-item-amount"}
            placeholder={copy.item.amount}
            value={amount}
            onChange={onAmountChange}
            onKeyDown={handleKeyDown}
            size="8"
          />
          <Errors errors={errors} />
        </div>
        <button
          className="new-item-submit"
          type="submit"
          name="monthly-item-submit"
          onClick={onSave}
        >
          {titleize(copy.item.createButtonText)}
        </button>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  const { collection } = state.budget.categories
  const categories = collection.filter(c => c.monthly)
  const optionFn = category => ({ value: category.id, label: category.name })
  const sortFn = (a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  const options = categories.map(optionFn).sort(sortFn)
  const { newItem } = state.budget.monthly
  const value = options.find(option => option.value === newItem.budget_category_id)
  const { month, year } = state.budget.metadata
  const errors = newItem.errors.map(error => error.amount)

  return {
    amount: newItem.amount,
    budget_category_id: newItem.budget_category_id,
    categories: categories,
    errors: errors,
    fetched: state.budget.categories.fetched,
    month: month,
    options: options,
    showForm: state.budget.monthly.showForm,
    value: value,
    year: year,
  }
}

export default connect(mapStateToProps)(MonthlyItemForm)
