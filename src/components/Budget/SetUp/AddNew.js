import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { categoriesFetched } from "../../../actions/budget"
import { addItem, editNew } from "../../../actions/budget/setup"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import { Link } from "react-router-dom"
import Select from "react-select"

import Icon from "../../Icons/Icon"
import Items from "./Items"

const AddNew = ({ baseMonth, categories, discretionary, dispatch, newMonth }) => {
  const { newItem, month, year } = newMonth
  const { budget_category_id, amount } = newItem
  const baseMonthString = dateFormatter.formatted({ month: baseMonth.month, year: baseMonth.year, format: "monthYear" })
  const monthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })

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
    const action = editNew(
      {
        budget_category_id: newCategory.id,
        amount: parseFloat(Math.round(newCategory.default_amount / 100.0)).toFixed(2),
      }
    )
    dispatch(action)
  }

  const handleAmountChange = (e) => {
    e.preventDefault()
    const action = editNew({ amount: e.target.value })
    dispatch(action)
  }

  return (
    <div className="set-up-workspace">
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
          <Link
            className="setup-next"
            to={`/budget/set-up/${month}/${year}`}
          >
            Continue
            {" "}
            <Icon className="fas fa-arrow-alt-circle-right" />
          </Link>
        </div>
      </div>
      <Items
        collection={newMonth.collection}
        discretionary={discretionary}
        dispatch={dispatch}
        isReady={newMonth.isReady}
        monthString={monthString}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { categories, setup } = state.budget
  const { newMonth } = setup
  const newWeeklyItemCategoryIds = newMonth.collection.map(item => item.budget_category_id)
  const discretionary = newMonth.collection.reduce((acc, item) => acc += item.amount, 0)
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
    baseMonth: setup.baseMonth,
    categories: {
      fetch: categories.fetched,
      collection: categories.collection,
      options: options,
      value: value,
    },
    discretionary: discretionary,
    newMonth: newMonth,
  }
}

export default connect(mapStateToProps)(AddNew)
