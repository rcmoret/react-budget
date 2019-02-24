import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import { reset, updated, updateProps } from "../../../actions/budget/categories"

import Form from "./Form/Form"

const Edit = (props) => {
  const { category } = props
  const { id } = category

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSelectChange = (e) => {
    const action = updateProps({ id: id, icon_id: e.value })
    console.log(e.value)
    props.dispatch(action)
  }

  const putBody = () => {
    if (!category.updatedProps) {
      return { id: id }
    } else if (category.updatedProps.default_amount) {
      return {
        ...category.updatedProps,
        default_amount: decimalToInt(category.updatedProps.default_amount)
      }
    } else {
      return category.updatedProps
    }
  }

  const onSubmit = (e) => {
    const url = ApiUrlBuilder(["budget", "categories", id])
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putBody())
    })
    .then(response => response.json())
    .then(data => props.dispatch(updated({ ...data, showForm: false })))
  }

  const formProps = {
    ...category,
    expense: category.expense.toString(),
    monthly: category.monthly.toString(),
    default_amount: (category.default_amount / 100.0).toFixed(2),
    ...category.updatedProps
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = reset({ id: id })
    props.dispatch(action)
  }

  return (
    <Form
      key={id}
      {...formProps}
      label="Update"
      onChange={onChange}
      onSelectChange={onSelectChange}
      onSubmit={onSubmit}
      optionsDisabled={true}
      resetForm={resetForm}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
