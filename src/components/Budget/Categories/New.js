import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { created, resetNewForm, toggleNewForm, updateNew, } from "../../../actions/budget/categories"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import { Link } from "react-router-dom"

import Form from "./Form/Form"
import Icon from "../../Icons/Icon"

const NewBudgetCategory = (props) => {
  const { dispatch, newCategory, showForm } = props

  const onChange = (e) => {
    const action = updateNew({ [e.target.name]: e.target.value })
    dispatch(action)
  }

  const onSelectChange = (e) => {
    const action = updateNew({ icon_id: e.value })
    dispatch(action)
  }

  const onSubmit = (e) => {
    const url = ApiUrlBuilder(["budget", "categories"])
    const postBody = {
      ...newCategory,
      default_amount: decimalToInt(newCategory.default_amount),
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(created(data))
        dispatch(resetNewForm())
      })
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = resetNewForm()
    props.dispatch(action)
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
        label="Create"
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
            Add New
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
