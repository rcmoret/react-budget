import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { reset, updated, updateProps } from "../../../actions/budget/categories"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import { put } from "../../../functions/ApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const {
    category,
    dispatch,
  } = props

  const {
    id,
    accrual,
    expense,
    monthly,
    updatedProps,
  } = category

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    dispatch(action)
  }

  const onSelectChange = (e) => {
    const action = updateProps({ id: id, icon_id: e.value })
    dispatch(action)
  }

  const putBody = () => {
    if (!updatedProps) {
      return { id: id }
    } else if (updatedProps.default_amount) {
      return {
        ...updatedProps,
        default_amount: decimalToInt(updatedProps.default_amount)
      }
    } else {
      return updatedProps
    }
  }

  const onSubmit = () => {
    put(
      ApiUrlBuilder(["budget", "categories", id]),
      JSON.stringify(putBody()),
      (data) => dispatch(updated({ ...data, showForm: false }))
    )
  }

  const formProps = {
    ...category,
    accrual: accrual.toString(),
    expense: expense.toString(),
    default_amount: (category.default_amount / 100.0).toFixed(2),
    monthly: monthly.toString(),
    ...updatedProps
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = reset({ id: id })
    dispatch(action)
  }

  return (
    <Form
      key={id}
      {...formProps}
      label={titleize(copy.category.updateButtonText)}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onSubmit={onSubmit}
      optionsDisabled={true}
      resetForm={resetForm}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
