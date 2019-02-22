import React from "react"
import { connect } from "react-redux"
import { resetIcon } from "../../actions/icons"

const ResetButton = (props) => {
  const reset = (e) => {
    e.preventDefault()
    props.dispatch(resetIcon({ id: props.id }))
  }

  if (props.id) {
    return (
      <button
        type="cancel"
        className="cancel"
        onClick={reset}
      >
        Cancel
      </button>
    )
  } else {
    return null
  }
}

export default connect((_state, ownProps) => ownProps)(ResetButton)
