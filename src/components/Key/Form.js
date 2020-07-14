import React from "react"
import { connect } from "react-redux"

import { terms } from "../../locales/copy"

import { removeApiError } from "../Messages/actions"

const Form = ({ dispatch, newApiKey }) => {
  const editedAction = apiKey => ({ type: "key/EDITED", payload: { apiKey: apiKey } })
  const updatedAction = apiKey => ({ type: "key/UPDATED", payload: { apiKey: apiKey } })

  const onChange = e => {
    dispatch(editedAction(e.target.value))
  }

  const handleKeyDown = e => {
    if (e.which === 13) {
      dispatch(updatedAction(newApiKey))
      dispatch(removeApiError({ status: 401 }))
    }
  }

  return (
    <div className="key-form">
      <i className="fas fa-key fa-rotate-270" />
      {" "}
      <input
        name="apiKey"
        value={newApiKey}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={terms.apiKey}
      />
    </div>
  )
}

const mapStateToProps = state => state.apiKey

export default connect(mapStateToProps)(Form)
