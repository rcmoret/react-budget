import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  created,
  errorsOnNew,
  resetNewForm,
  toggleNewForm,
  updateNew,
} from "../../../actions/budget/categories"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { post } from "../../../functions/ApiClient"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"

import Form from "./Form/Form"
import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"

const NewBudgetCategory = (props) => {
  const {
    addNew,
    cancelButtonText,
    createButtonText,
  } = copy.category

  const {
    dispatch,
    newCategory,
    showForm,
  } = props

  const onChange = (e) => {
    const action = updateNew({ [e.target.name]: e.target.value })
    dispatch(action)
  }

  const onSelectChange = (e) => {
    const action = updateNew({ icon_id: e.value })
    dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder({ route: "budget-categories-index" })
    const body = JSON.stringify({
      ...newCategory,
      default_amount: decimalToInt(newCategory.default_amount),
    })
    const onSuccess = data => {
      const createdAction = created(data)
      dispatch(createdAction)
      dispatch(resetNewForm())
    }
    const errorHandler = (response) => {
      dispatch(errorsOnNew(response))
    }
    const event = EventMessageBuilder({ eventType: "budget-category-create" })
    post(url, body, { onSuccess: onSuccess, onFailure: errorHandler, event: event })
  }

  const toggleForm = (e) => {
    e.preventDefault()
    const action = toggleNewForm({ showForm: !showForm })
    dispatch(action)
    dispatch(resetNewForm())
  }

  if (showForm) {
    return (
      <Form
        {...newCategory}
        expenseName="expense"
        cancelLabel={titleize(cancelButtonText)}
        label={titleize(createButtonText)}
        monthlyName="monthly"
        onChange={onChange}
        onSelectChange={onSelectChange}
        onSubmit={onSubmit}
        optionsDisabled={false}
      />
    )
  } else {
    return (
      <div className="budget-category-form">
        <Link
          to="#"
          onClick={toggleForm}
        >
          <div className="add-new-category-button">
            <Icon className="fas fa-plus" />
            {" "}
            {titleize(addNew)}
          </div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { newCategory } = state.budget
  const errors = newCategory.errors.reduce((acc, error) => {
    Object.entries(error).map(arr => {
      const key = arr[0]
      const messages = arr[1]
      const existingMessages = acc[key] || []
      acc[key] = [...existingMessages, ...messages]

      return acc
    })

    return acc
  }, {})

  return {
    newCategory: { ...newCategory, errors: errors },
    showForm: state.budget.categories.showForm,
  }
}

export default connect(mapStateToProps)(NewBudgetCategory)
