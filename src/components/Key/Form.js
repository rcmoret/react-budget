import React from "react"
import { connect } from "react-redux"

import { terms } from "../../locales/copy"

import { removeErrorMessage } from "../Messages/actions"

import { apiKeyEdited, apiKeyUpdated } from "../Api/actions"

const Form = ({ dispatch, error, keyFormInput }) => {

  const onChange = e => {
    dispatch(apiKeyEdited(e.target.value))
  }

  const handleKeyDown = e => {
    if (e.which === 13) {
      dispatch(apiKeyUpdated(keyFormInput))
      dispatch(removeErrorMessage({ type: "api", status: 401, errorMessage: error }))
    }
  }

  return (
    <div className="key-form">
      <i className="fas fa-key fa-rotate-270" />
      {" "}
      <input
        name="apiKey"
        value={keyFormInput}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={terms.apiKey}
      />
    </div>
  )
}

const mapStateToProps = state => ({ ...state.api })

export default connect(mapStateToProps)(Form)
