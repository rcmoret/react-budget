import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { update, updated, updateProps } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import EventMessageBuilder, { changedProps } from "../../functions/EventMessageBuilder"
import { put } from "../../functions/ApiClient"

import Form from "./Form/Form"

const Edit = ({ dispatch, icon }) => {
  const { id, updatedProps } = icon

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder({ route: "icon-show", id: id })
    const body = JSON.stringify(updatedProps)
    const event = EventMessageBuilder({
      eventType: "icon-update",
      id: id,
      changedProps: changedProps(icon, updatedProps),
    })
    const onSuccess = data => {
      dispatch(updated(data))
      dispatch(update({ id: id, showForm: false }))
    }
    put(url, body, { onSuccess: onSuccess, events: [event] })
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

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Edit)
