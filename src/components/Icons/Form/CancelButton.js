import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { update } from "../actions"

const CancelButton = ({ id, dispatch }) => {
  const cancel = () => {
    const action = update({ id: id, updatedProps: null, showForm: false })
    dispatch(action)
  }

  if (id) {
    return (
      <button
        type="cancel"
        className="cancel"
        onClick={cancel}
      >
        {titleize(copy.icon.cancelButtonText)}
      </button>
    )
  } else {
    return null
  }
}

export default connect((_state, ownProps) => ownProps)(CancelButton)
