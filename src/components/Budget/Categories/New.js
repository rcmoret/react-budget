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
import JsonBody from "../../../functions/JsonBody"
import { post } from "../../../functions/RestApiClient"
import { decimalToInt } from "../../../functions/MoneyFormatter"

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
    const action = updateNew({ iconId: e.value })
    dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder(["budget/categories"])
    const body = JsonBody("budgetCategory", { payload: {
      ...newCategory,
      defaultAmount: decimalToInt(newCategory.defaultAmount),
    }})
    const dispatches = (data) => {
      const createdAction = created(data)
      dispatch(createdAction)
      dispatch(resetNewForm())
    }
    const errorHandler = (response) => {
      dispatch(errorsOnNew(response))
    }

    post(url, body, dispatches, errorHandler)
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = resetNewForm()
    dispatch(action)
  }

  const toggleForm = (e) => {
    e.preventDefault()
    const action = toggleNewForm({ showForm: !showForm })
    dispatch(action)
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
        resetForm={resetForm}
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
  return {
    newCategory: state.budget.newCategory,
    showForm: state.budget.categories.showForm,
  }
}

export default connect(mapStateToProps)(NewBudgetCategory)
