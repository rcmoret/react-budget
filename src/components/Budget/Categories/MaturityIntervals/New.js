import React from "react"

import { budget as copy } from "../../../../locales/copy"
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
    apiKey,
    dispatch,
    newMaturityIntervalAttributes,
    showMaturityIntervalForm,
  } = props

  const { options } = copy.maturityInterval
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

  const addMaturityInterval = () => {
    const url = ApiUrlBuilder(["budget/categories", id, "maturity_intervals"], { key: apiKey })
    const body = JSON.stringify(newMaturityIntervalAttributes)
    const onSuccess = data => dispatch(maturityIntervalCreated({
      id: id,
      maturityInterval: data
    }))
    const onFailure = data => console.log({ body: body, data: data })
    post(url, body, onSuccess, onFailure)
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
