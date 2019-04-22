import React, { Component } from "react"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { addWeeklyItem, categoriesFetched, editNewWeeklyItem, toggleWeeklyItemForm } from "../../../actions/budget"
import { connect } from "react-redux"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import Select from "react-select"

class WeeklyItemForm extends Component {
  constructor(props) {
    super(props)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onAmountChange = this.onAmountChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidUpdate() {
    if (this.props.showForm && !this.props.categoriesFetched) {
      const url = ApiUrlBuilder(["budget", "categories"])
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(categoriesFetched(data)))
    }
  }

  onCategoryChange(e) {
    const category = this.props.categories.find(category => category.id === e.value)
    this.props.dispatch(editNewWeeklyItem({
      budget_category_id: e.value,
      amount: parseFloat(category.default_amount / 100.0).toFixed(2)
    }))
  }

  onAmountChange(e) {
    this.props.dispatch(editNewWeeklyItem({
      amount: e.target.value
    }))
  }

  onSave(e) {
    e.preventDefault()
    const { amount, budget_category_id, month, year } = this.props
    const body = {
      month: month,
      year: year,
      amount: decimalToInt(amount),
      budget_category_id: budget_category_id,
    }
    const url = ApiUrlBuilder(["budget", "categories", budget_category_id, "items"])
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => this.props.dispatch(
        addWeeklyItem(data)
      ))
      .then(() => {
        this.props.dispatch(toggleWeeklyItemForm({ showForm: false }))
        this.props.dispatch(editNewWeeklyItem({ amount: "", budget_category_id: null }))
      })
  }

  render() {
    if (this.props.showForm) {
      return (
        <div className="new-budget-item">
          <div className="select-wrapper">
            <Select
              value={this.props.value}
              options={this.props.options}
              onChange={this.onCategoryChange}
              className="budget-category-select-container"
              classNamePrefix="budget-category-select"
            />
          </div>
          <input
            name="amount"
            className="new-item-amount"
            placeholder="amount"
            value={this.props.amount}
            onChange={this.onAmountChange}
          />
          <button
            className="new-item-submit"
            type="submit"
            name="weekly-item-submit"
            onClick={this.onSave}
          >
            CREATE
          </button>
        </div>
      )
    } else {
      return null
    }
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
    options: options,
    categories: categories,
    showForm: state.budget.weekly.showForm,
    categoriesFetched: state.budget.categories.fetched,
    value: value,
    amount: newItem.amount,
    budget_category_id: newItem.budget_category_id,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(WeeklyItemForm)
