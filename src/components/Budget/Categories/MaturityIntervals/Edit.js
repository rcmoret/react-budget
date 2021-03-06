import React from "react"

import { budget as copy } from "../../../../locales/copy"
import {
  editMaturityInterval,
  toggleMaturityIntervalEditForm,
  updateMaturityInterval,
} from "../../../../actions/budget/categories"

import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import EventMessageBuilder, { changedProps } from "../../../../functions/EventMessageBuilder"
import { put } from "../../../../functions/ApiClient"

import Form from "./Form"

export default (props) => {
  const {
    id,
    category_id,
    dispatch,
    month,
    name,
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
    const event = EventMessageBuilder({
      eventType: "maturity-interval-update",
      id: id,
      name: name,
      changedProps: changedProps(props, updatedProps),
    })
    const url = ApiUrlBuilder({
      route: "budget-category-maturity-interval-show",
      id: id,
      budgetCategoryId: category_id,
    })
    const body = JSON.stringify(maturityInterval)
    const onSuccess = data => {
      dispatch(updateMaturityInterval(data))
      closeForm()
    }
    put(url, body, { onSuccess: onSuccess, events: [event] })
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
