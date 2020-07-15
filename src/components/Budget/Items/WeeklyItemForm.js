import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { addWeeklyItem, editNewWeeklyItem, toggleWeeklyItemForm } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
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
    const url = ApiUrlBuilder({
      route: "budget-category-items-index",
      id: budget_category_id,
    })
    const body = JSON.stringify({
      amount: decimalToInt(EvaluateInput(amount)),
      month: month,
      year: year,
    })
    const onSuccess = data => {
      dispatch(addWeeklyItem(data))
      dispatch(toggleWeeklyItemForm({ showForm: false }))
      dispatch(editNewWeeklyItem({ amount: "", budget_category_id: null }))
    }
    const onFailure = data => {
      const action = editNewWeeklyItem({ errors: data.errors })
      dispatch(action)
    }
    post(url, body, onSuccess, onFailure)
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

  return {
    amount: newItem.amount,
    categories: categories,
    budget_category_id: newItem.budget_category_id,
    errors: (newItem.errors.amount || []),
    fetched: state.budget.categories.fetched,
    month: month,
    options: options,
    showForm: state.budget.weekly.showForm,
    value: value,
    year: year,
  }
}

export default connect(mapStateToProps)(WeeklyItemForm)
