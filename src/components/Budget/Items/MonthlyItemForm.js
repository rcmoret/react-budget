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
import { post } from "../../../functions/ApiClient"

import Select from "react-select"

const MonthlyItemForm = (props) => {
  const {
    amount,
    budget_category_id,
    categories,
    dispatch,
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
    post(
      ApiUrlBuilder(["budget/categories", budget_category_id, "items"]),
      JSON.stringify({
        amount: decimalToInt(amount),
        month: month,
        year: year
      }),
      (data) => {
        dispatch(addMonthlyItem(data))
        dispatch(toggleMonthlyItemForm({ showForm: false }))
        dispatch(editNewMonthlyItem({ amount: "", budget_category_id: null }))
      }
    )
  }

  if (showForm) {
    return (
      <div className="new-budget-item">
        <div className="select-wrapper">
          <Select
            value={value}
            options={options}
            onChange={onCategoryChange}
            className="budget-category-select-container"
            classNamePrefix="budget-category-select"
          />
        </div>
        <input
          name="amount"
          className="new-item-amount"
          placeholder={copy.item.amount}
          value={amount}
          onChange={onAmountChange}
          onKeyDown={handleKeyDown}
        />
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
  const options = categories.map(category => {
    return { value: category.id, label: category.name, }
  }).sort((a, b) => {
    return a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  })
  const { newItem } = state.budget.monthly
  const value = options.find(option => option.value === newItem.budget_category_id)
  const { month, year } = state.budget.metadata
  return {
    options: options,
    categories: categories,
    showForm: state.budget.monthly.showForm,
    fetched: state.budget.categories.fetched,
    value: value,
    amount: newItem.amount,
    budget_category_id: newItem.budget_category_id,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(MonthlyItemForm)
