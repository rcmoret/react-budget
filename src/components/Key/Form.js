import React from "react"
import { connect } from "react-redux"

import { terms } from "../../locales/copy"

import { removeApiError } from "../Messages/actions"

import { apiKeyEdited, apiKeyUpdated } from "../Api/actions"

const Form = ({ dispatch, keyFormInput }) => {

  const onChange = e => {
    dispatch(apiKeyEdited(e.target.value))
  }

  const handleKeyDown = e => {
    if (e.which === 13) {
      dispatch(apiKeyUpdated(keyFormInput))
      dispatch(removeApiError({ status: 401 }))
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
