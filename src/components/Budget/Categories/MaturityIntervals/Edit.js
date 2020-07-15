import React from "react"

import { budget as copy } from "../../../../locales/copy"
import {
  editMaturityInterval,
  toggleMaturityIntervalEditForm,
  updateMaturityInterval,
} from "../../../../actions/budget/categories"

import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import { put } from "../../../../functions/ApiClient"

import Form from "./Form"

export default (props) => {
  const {
    id,
    apiKey,
    category_id,
    dispatch,
    month,
    updatedProps,
    year,
  } = props

  const maturityInterval = {
    id: id,
    month: month,
    year: year,
    ...updatedProps,
  }

  const { options } = copy.maturityInterval
  const value = options.find(option => option.value === maturityInterval.month)

  const onChange = (payload) => {
    const action = editMaturityInterval({ id: id, ...payload })
    dispatch(action)
  }

  const closeForm = () => {
    const action = toggleMaturityIntervalEditForm({
      id: id,
      showForm: false,
    })
    dispatch(action)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const url = ApiUrlBuilder({
      route: "budget-category-maturity-interval-show",
      id: id,
      budgetCategoryId: category_id,
      query: { key: apiKey },
    })
    const body = JSON.stringify(maturityInterval)
    const onSuccess = data => {
      dispatch(updateMaturityInterval(data))
      closeForm()
    }
    put(url, body, onSuccess)
  }

  return (
    <Form
      cancel={closeForm}
      maturityInterval={maturityInterval}
      onChange={onChange}
      onSubmit={onSubmit}
      options={options}
      value={value}
    />
  )
}
