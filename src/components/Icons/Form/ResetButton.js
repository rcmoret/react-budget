import React from "react"
import { connect } from "react-redux"
import { resetIcon, resetNew } from "../actions"

const ResetButton = (props) => {
  const { id } = props
  const reset = (e) => {
    e.preventDefault()
    if (id) {
      props.dispatch(resetIcon({ id: id }))
    } else {
      props.dispatch(resetNew())
    }
  }

  return (
    <button
      type="reset"
      className="reset"
      onClick={reset}
    >
      Reset
    </button>
  )
}

export default connect((_state, ownProps) => ownProps)(ResetButton)
