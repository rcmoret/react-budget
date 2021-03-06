import React from "react"
import { connect } from "react-redux"

import { resetAccount, update, updated, updateProps } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import EventMessageBuilder, { changedProps } from "../../functions/EventMessageBuilder"
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

  const updateAccountProps = (e) => {
    e.preventDefault()
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    dispatch(action)
  }

  const updateCashFlow = () => {
    const action = updateProps({ id: id, cash_flow: !formProps.cash_flow })
    dispatch(action)
  }

  const submitForm = () => {
    const event = EventMessageBuilder({
      eventType: "account-update",
      id: id,
      name: {...props, ...updatedProps}.name,
      changedProps: changedProps(props, updatedProps),
    })
    const url = ApiUrlBuilder({ route: "account-show", id: id })
    const body = JSON.stringify(updatedProps)
    const onSuccess = data => {
      dispatch(updated(data))
      dispatch(update({ id: id, showForm: false }))
    }
    put(url, body, { onSuccess: onSuccess, events: [event] })
  }

  return (
    <Form
      {...formProps}
      closeForm={closeForm}
      title={name}
      updateAccountProps={updateAccountProps}
      updateCashFlow={updateCashFlow}
      resetForm={resetForm}
      submitForm={submitForm}
    />
  )
}

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Edit)
