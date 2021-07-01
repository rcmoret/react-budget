import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { addWeeklyItem, editNewWeeklyItem, toggleWeeklyItemForm } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import { post } from "../../../functions/ApiClient"

import Errors from "../../Errors/Errors"
import Select from "react-select"

const WeeklyItemForm = (props) => {
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
    const action = editNewWeeklyItem({
      budget_category_id: e.value,
      amount: parseFloat(category.default_amount / 100.0).toFixed(2)
    })
    dispatch(action)
  }

  const onAmountChange = (e) => {
    const action = editNewWeeklyItem({ amount: e.target.value })
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
      dispatch(addWeeklyItem(data[0].item))
      dispatch(toggleWeeklyItemForm({ showForm: false }))
      dispatch(editNewWeeklyItem({ amount: "", budget_category_id: null }))
    }
    const onFailure = data => {
      const action = editNewWeeklyItem({
        errors: [
          { amount: data.errors[0]["create_item_form.0.amount"] }
        ]
      })
      dispatch(action)
    }
    const event = data => EventMessageBuilder({ eventType: "budget-item-create", item: data[0].item })
    post(url, body, { onSuccess: onSuccess, onFailure: onFailure, events: [event] })
  }

  if (!showForm) {
    return null
  }

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
          placeholder="amount"
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
        name="weekly-item-submit"
        onClick={onSave}
      >
        {titleize(copy.item.createButtonText)}
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  const currentCategoryIds = state.budget.weekly.collection.map(item => item.budget_category_id)
  const categories = state.budget.categories.collection.filter(category => {
    return !category.monthly && !currentCategoryIds.includes(category.id)
  })
  const collection = categories.map(category => {
    return {
      value: category.id,
      label: category.name,
    }
  })
  const options = collection.sort((a, b) => {
    return a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  })
  const { newItem } = state.budget.weekly
  const value = options.find(option => option.value === newItem.budget_category_id)
  const { month, year } = state.budget.metadata
  const errors = newItem.errors.map(error => error.amount)

  return {
    amount: newItem.amount,
    categories: categories,
    budget_category_id: newItem.budget_category_id,
    errors: errors,
    fetched: state.budget.categories.fetched,
    month: month,
    options: options,
    showForm: state.budget.weekly.showForm,
    value: value,
    year: year,
  }
}

export default connect(mapStateToProps)(WeeklyItemForm)
