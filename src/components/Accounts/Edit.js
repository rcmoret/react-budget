import React from "react"
import { connect } from "react-redux"

import { resetAccount, update, updated, updateProps } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { put } from "../../functions/ApiClient"

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
    const action = updateProps({ id: id, cash_flow: !formProps.cash_flow })
    dispatch(action)
  }

  const submitForm = () => {
    put(
      ApiUrlBuilder(["accounts", id]),
      JSON.stringify(updatedProps),
      (data) => {
        dispatch(updated(data))
        dispatch(update({ id: id, showForm: false }))
      }
    )
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
