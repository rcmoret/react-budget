import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { categoriesFetched } from "../../../actions/budget"
import { addItem, editAddNew, nextStep } from "../../../actions/budget/setup"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import Select from "react-select"

import Icon from "../../Icons/Icon"

const AddNew = ({ baseMonthString, categories, dispatch, newMonth }) => {
  const { newItem, month, year } = newMonth
  const { budget_category_id, amount } = newItem

  if (!categories.fetch) {
    const categoryUrl = ApiUrlBuilder(["budget", "categories"])
    fetch(categoryUrl)
      .then(response => response.json())
      .then(data => dispatch(categoriesFetched(data)))
  }

  const postNewItem = () => {
    const body = {
      amount: decimalToInt(amount),
      budget_category_id: budget_category_id,
      month: month,
      year: year,
    }
    const url = ApiUrlBuilder(["budget", "categories", budget_category_id, "items"])
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => dispatch(addItem({ ...data, reviewed: true })))
  }

  const handleSelect = (e) => {
    const newCategory = categories.collection.find(category => category.id === e.value)
    const action = editAddNew(
      {
        budget_category_id: newCategory.id,
        amount: parseFloat(Math.round(newCategory.default_amount / 100.0)).toFixed(2),
      }
    )
    dispatch(action)
  }

  const handleAmountChange = (e) => {
    e.preventDefault()
    const action = editAddNew({ amount: e.target.value })
    dispatch(action)
  }

  const setupNext = (e) => {
    e.preventDefault()
    const action = nextStep()
    dispatch(action)
  }

  return (
    <div className="set-up-intro">
      <p>
        Is there anything that was not in {baseMonthString}'s budget that you want to add before continuing?
      </p>
      <div className="set-up-intro-select">
        <Select
          options={categories.options}
          onChange={handleSelect}
          value={categories.value}
          isSearchable={true}
        />
      </div>
      <div className="set-up-intro-input">
        <input
          type="text"
          placeholder="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="set-up-intro-create">
        <button
          onClick={postNewItem}
        >
          Add
          {" "}
          <Icon className="fas fa-plus" />
        </button>
      </div>
      <div className="set-up-intro-next">
        <p>Or click below to continue</p>
        <button
          className="setup-next"
          onClick={setupNext}
        >
          Continue
          {" "}
          <Icon className="fas fa-arrow-alt-circle-right" />
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { categories, setup } = state.budget
  const { newMonth } = setup
  const newWeeklyItemCategoryIds = newMonth.collection.map(item => item.budget_category_id)
  const availableCategories = categories.collection.filter(category =>
    !newWeeklyItemCategoryIds.includes(category.id) || category.monthly
  )
  const sortedCategories = availableCategories.sort((a, b) => a.name < b.name ? -1 : 1)
  const categoryOptions = sortedCategories.map(category => {
    return { value: category.id, label: category.name }
  })
  const options = [{ value: null, label: "" }, ...categoryOptions]
  const value = options.find(opt => opt.value === newMonth.newItem.budget_category_id)

  return {
    categories: {
      fetch: categories.fetched,
      collection: categories.collection,
      options: options,
      value: value,
    },
    ...ownProps
  }
}

export default connect(mapStateToProps)(AddNew)
