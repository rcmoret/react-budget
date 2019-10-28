import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  applyErrorsOnEdit,
  reset,
  updated,
  updateProps,
} from "../../../actions/budget/categories"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import { put } from "../../../functions/RestApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const {
    category,
    dispatch,
  } = props

  const {
    id,
    accrual,
    defaultAmount,
    expense,
    monthly,
    updatedProps,
  } = category

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    dispatch(action)
  }

  const onSelectChange = (e) => {
    const action = updateProps({ id: id, iconId: e.value })
    dispatch(action)
  }

  const putBody = () => {
    if (!updatedProps) {
      return { id: id }
    } else if (updatedProps.defaultAmount) {
      return {
        ...updatedProps,
        default_amount: decimalToInt(updatedProps.defaultAmount)
      }
    } else {
      return updatedProps
    }
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder(["budget", "categories", id])
    const body = JSON.stringify(putBody())
    const onSuccess = (data) => dispatch(updated({ ...data, showForm: false }))
    const onFailure = (data) => dispatch(applyErrorsOnEdit({ id: id, ...data }))
    put(url, body, onSuccess, onFailure)
  }

  const formProps = {
    ...category,
    accrual: accrual.toString(),
    default_amount: (defaultAmount / 100.0).toFixed(2),
    expense: expense.toString(),
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
      expenseName={`expense[${id}]`}
      label={titleize(copy.category.updateButtonText)}
      monthlyName={`monthly[${id}]`}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onSubmit={onSubmit}
      optionsDisabled={true}
      resetForm={resetForm}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
