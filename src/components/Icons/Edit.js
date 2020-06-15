import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { update, updated, updateProps } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { put } from "../../functions/ApiClient"

import Form from "./Form/Form"

const Edit = ({ apiKey, dispatch, icon }) => {
  const { id } = icon

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder(["icons", id], { key: apiKey })
    const body = JSON.stringify(icon.updatedProps)
    const onSuccess = data => {
      dispatch(updated(data))
      dispatch(update({ id: id, showForm: false }))
    }
    const onFailure = data => console.log({ body: body, data: data })
    put(url, body, onSuccess, onFailure)
  }

  const formProps = { ...icon, ...icon.updatedProps }
  return (
    <Form
      {...formProps}
      buttonText={titleize(copy.icon.updateButtonText)}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({ ...ownProps, apiKey: state.apiKey.apiKey })
export default connect(mapStateToProps)(Edit)
