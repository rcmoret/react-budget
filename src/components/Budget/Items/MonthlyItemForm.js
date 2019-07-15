import React from "react"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { addMonthlyItem, editNewMonthlyItem, toggleMonthlyItemForm } from "../../../actions/budget"
import { connect } from "react-redux"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
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
      .then(data => dispatch(addMonthlyItem(data)))
      .then(() => {
        dispatch(toggleMonthlyItemForm({ showForm: false }))
        dispatch(editNewMonthlyItem({ amount: "", budget_category_id: null }))
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
          onKeyDown={handleKeyDown}
        />
        <button
          className="new-item-submit"
          type="submit"
          name="monthly-item-submit"
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
