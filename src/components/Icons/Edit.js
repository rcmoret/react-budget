import React from "react"
import { connect } from "react-redux"

import { update, updated, updateProps } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { put } from "../../functions/ApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const { id } = props.icon

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSubmit = () => {
    put(
      ApiUrlBuilder(["icons", id]),
      JSON.stringify(props.icon.updatedProps),
      (data) => {
        props.dispatch(updated(data))
        props.dispatch(update({ id: id, showForm: false }))
      }
    )
  }

  const formProps = { ...props.icon, ...props.icon.updatedProps }
  return (
    <Form
      {...formProps}
      buttonText="Update"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
