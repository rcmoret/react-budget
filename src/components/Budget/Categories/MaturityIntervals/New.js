import React from "react"

import {
  maturityIntervalCreated,
  updated
} from "../../../../actions/budget/categories"
import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import { post } from "../../../../functions/ApiClient"

import Form from "./Form"

export default (props) => {
  const {
    id,
    dispatch,
    newMaturityIntervalAttributes,
    showMaturityIntervalForm,
  } = props

  const maturityInterval = newMaturityIntervalAttributes || {}

  const updateNewMaturityInterval = (payload) => {
    const action = updated({
      id: id,
      newMaturityIntervalAttributes: { ...newMaturityIntervalAttributes, ...payload }
    })
    dispatch(action)
  }

  const hideForm = () => {
    const action = updated({ id: id, showMaturityIntervalForm: false })
    dispatch(action)
  }

  const options = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ]

  const addMaturityInterval = () => {
    post(
      ApiUrlBuilder(["budget/categories", id, "maturity_intervals"]),
      JSON.stringify(newMaturityIntervalAttributes),
      (data) => dispatch(maturityIntervalCreated({
        id: id,
        maturityInterval: data
      }))
    )
  }

  const onChange = (payload) => {
    updateNewMaturityInterval(payload)
  }

  if (showMaturityIntervalForm) {
    return (
      <Form
        cancel={hideForm}
        maturityInterval={maturityInterval}
        onChange={onChange}
        onSubmit={addMaturityInterval}
        options={options}
      />
    )
  } else {
    return null
  }
}
