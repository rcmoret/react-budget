import React from "react"

import { errors as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { removeErrorMessage } from "./actions"

import Icon from "../Icons/Icon"
import KeyForm from "../Key/Form"
import { Link } from "react-router-dom"

export default ({ dispatch, errorCount, errors, keys }) => {
  if (errorCount === 0) {
    return null
  } else {
    const heading = errorCount === 1 ? copy.error : copy.errors
    return (
      <div className="top-level-errors">
        <span className="message-heading">{titleize(heading)}:</span>
        <div>
          {keys.map((objkey, index) =>
            <ErrorGroup
              key={index}
              dispatch={dispatch}
              errors={errors[objkey]}
              type={objkey}
            />
          )}
        </div>
      </div>
    )
  }
}

const ErrorGroup = ({ dispatch, errors, type }) => {
  const keys = Object.keys(errors)
  const errorCount = keys.reduce((sum, key) => sum + errors[key].length, 0)
  if (errorCount === 0) {
    return null
  } else {
    return (
      <div>
        <strong>{titleize(type)}</strong>
        {keys.map((status, index) =>
          <ErrorMessage
            key={index}
            dispatch={dispatch}
            errors={errors[status]}
            status={status}
            type={type}
          />
        )}
      </div>
    )
  }
}

const ErrorMessage = (props) => {
  const { errors, status } = props

  return errors.map((error, index) => (
    <div key={index}>
      <Icon className="fas fa-exclamation-circle font-red" />
      {" "}
      {status}
      {" "}
      -
      {" "}
      {error}
      {" "}
      {status === "401" ? <KeyForm error={error} /> : <RemoveButton error={error} {...props} />}
    </div>
  ))
}

const RemoveButton = ({ dispatch, error, status, type }) => {
  const onClick = () => {
    const action = removeErrorMessage({
      errorMessage: error,
      status: status,
      type: type,
    })
    dispatch(action)
  }

  return (
    <Link
      to="#"
      className="fas fa-times"
      onClick={onClick}
    />
  )
}
