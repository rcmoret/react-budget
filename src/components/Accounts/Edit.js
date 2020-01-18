import React from "react"
import { connect } from "react-redux"

import { resetAccount, update, updated, updateProps } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import JsonBody from "../../functions/JsonBody"
import { put } from "../../functions/RestApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const {
    id,
    dispatch,
    name,
    updatedProps,
  } = props

  const formProps = { ...props, ...updatedProps }

  const closeForm = () => {
    const action = resetAccount({ id: id, showForm: false })
    dispatch(action)
  }

  const resetForm = () => {
    const action = resetAccount({ id: id })
    dispatch(action)
  }

  const updateName = (e) => {
    e.preventDefault()
    const action = updateProps({ id: id, name: e.target.value })
    dispatch(action)
  }

  const updatePriority = (e) => {
    e.preventDefault()
    const action = updateProps({ id: id, priority: e.target.value })
    dispatch(action)
  }

  const updateCashFlow = () => {
    const action = updateProps({ id: id, cashFlow: !formProps.cashFlow })
    dispatch(action)
  }

  const submitForm = () => {
    const url = ApiUrlBuilder(["accounts", id])
    const body = JsonBody("account", { payload: updatedProps })
    const onSuccess = (data) => {
      dispatch(updated(data))
      dispatch(update({ id: id, showForm: false }))
    }
    put(url, body, onSuccess)
  }

  return (
    <Form
      {...formProps}
      closeForm={closeForm}
      title={name}
      updateName={updateName}
      updatePriority={updatePriority}
      updateCashFlow={updateCashFlow}
      resetForm={resetForm}
      submitForm={submitForm}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
