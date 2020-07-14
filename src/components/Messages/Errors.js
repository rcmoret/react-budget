import React from "react"
import { connect } from "react-redux"

import { errors as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { removeApiError } from "./actions"

import Icon from "../Icons/Icon"
import KeyForm from "../Key/Form"
import { Link } from "react-router-dom"

const Errors = ({ dispatch, errors }) => {
  if (errors.api.length === 0) {
    return null
  } else {
    const heading = errors.length === 1 ? copy.error : copy.errors
    return (
      <div className="top-level-errors">
        <span className="message-heading">{titleize(heading)}:</span>
        <div>
          {errors.api.map((error, index) => (
            <GenericError
              key={index}
              dispatch={dispatch}
              error={error}
              type='API'
            />
          ))}
        </div>
      </div>
    )
  }
}

const GenericError = ({ dispatch, error, type }) => {
  const dismissError = () => {
    const action = removeApiError(error)
    dispatch(action)
  }

  if (error.status === 401) {
    return (
      <Unauthorized
        error={error}
        type={type}
      />
    )
  } else {
    return (
      <div className="message">
        <Icon className="fas fa-exclamation-circle font-red" />
        {" "}
        {type}
        {" "}
        -
        {" "}
        {error.message}
        {" "}
        <em>({error.status})</em>
        {" "}
        <Link
          to='#'
          className="fas fa-times"
          onClick={dismissError}
        />
      </div>
    )
  }
}

const Unauthorized = ({ error, type }) => (
  <div className="message">
    <Icon className="fas fa-exclamation-circle font-red" />
    {" "}
    {type}
    {" "}
    -
    {" "}
    {error.message}
    {" "}
    <em>({error.status})</em>
    {" "}
    <KeyForm />
  </div>
)

const mapStateToProps = state => ({ errors: state.messages.errors })
export default connect(mapStateToProps)(Errors)
