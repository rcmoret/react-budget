import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { created, updateNew } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { post } from "../../functions/ApiClient"

import Form from "./Form/Form"

const New = (props) => {
  const onChange = (e) => {
    const action = updateNew({[e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSubmit = () => {
    post(
      ApiUrlBuilder(["icons"]),
      JSON.stringify(props.newIcon),
      (data) => props.dispatch(created(data))
    )
  }

  return (
    <Form
      buttonText={titleize(copy.icon.createButtonText)}
      icon={props.newIcon}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

const mapStateToProps = (state) => {
  return { newIcon: state.icons.newIcon }
}

export default connect(mapStateToProps)(New)
