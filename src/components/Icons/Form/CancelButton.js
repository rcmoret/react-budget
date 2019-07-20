import React from "react"
import { connect } from "react-redux"
import { update } from "../actions"

const CancelButton = (props) => {
  const { id } = props
  const cancel = () => {
    const action = update({ id: id, updatedProps: null, showForm: false })
    props.dispatch(action)
  }

  if (id) {
    return (
      <button
        type="cancel"
        className="cancel"
        onClick={cancel}
      >
        Cancel
      </button>
    )
  } else {
    return null
  }
}

export default connect((_state, ownProps) => ownProps)(CancelButton)
