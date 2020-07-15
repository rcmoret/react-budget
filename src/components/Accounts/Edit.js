import React from "react"
import { connect } from "react-redux"

import { resetAccount, update, updated, updateProps } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { put } from "../../functions/ApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const {
    id,
    apiKey,
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
    const url = ApiUrlBuilder({
      route: "account-show",
      id: id,
      query: { key: apiKey },
    })
    const body = JSON.stringify(updatedProps)
    const onSuccess = data => {
      dispatch(updated(data))
      dispatch(update({ id: id, showForm: false }))
    }
    const onFailure = data => console.log({ body: body, data: data })
    put(url, body, onSuccess, onFailure)
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

const mapStateToProps = (state, ownProps) => ({ ...ownProps, apiKey: state.apiKey.apiKey })

export default connect(mapStateToProps)(Edit)
