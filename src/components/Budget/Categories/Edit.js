import React from "react"
import { connect } from "react-redux"

import { reset, updated, updateProps } from "../../../actions/budget/categories"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import { put } from "../../../functions/ApiClient"

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

  const onSubmit = () => {
    put(
      ApiUrlBuilder(["budget", "categories", id]),
      JSON.stringify(putBody()),
      (data) => props.dispatch(updated({ ...data, showForm: false }))
    )
  }

  const formProps = {
    ...category,
    accrual: category.accrual.toString(),
    expense: category.expense.toString(),
    default_amount: (category.default_amount / 100.0).toFixed(2),
    monthly: category.monthly.toString(),
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
