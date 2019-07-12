import React, { Component } from "react"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { addWeeklyItem, editNewWeeklyItem, toggleWeeklyItemForm } from "../../../actions/budget"
import { categoriesFetched } from "../../../actions/budget/categories"
import { connect } from "react-redux"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import Select from "react-select"

const WeeklyItemForm = (props) => {
  const {
    amount,
    budget_category_id,
    categories,
    fetched,
    dispatch,
    month,
    options,
    showForm,
    value,
    year,
  } = props

  if (!fetched) {
    const url = ApiUrlBuilder(["budget/categories"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(categoriesFetched(data)))
  }

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

  const onSave = (e) => {
    e.preventDefault()
    const body = {
      amount: decimalToInt(amount),
      month: month,
      year: year,
    }
    const url = ApiUrlBuilder(["budget/categories", budget_category_id, "items"])
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => dispatch(addWeeklyItem(data)))
      .then(() => {
        dispatch(toggleWeeklyItemForm({ showForm: false }))
        dispatch(editNewWeeklyItem({ amount: "", budget_category_id: null }))
      })
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
          placeholder="amount"
          value={amount}
          onChange={onAmountChange}
        />
        <button
          className="new-item-submit"
          type="submit"
          name="weekly-item-submit"
          onClick={onSave}
        >
          CREATE
        </button>
      </div>
    )
  } else {
    return null
  }
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
    fetched: state.budget.categories.fetched,
    month: month,
    options: options,
    showForm: state.budget.weekly.showForm,
    value: value,
    year: year,
  }
}

export default connect(mapStateToProps)(WeeklyItemForm)
