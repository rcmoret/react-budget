import React from "react"
import Icon from "../Icons/Icon"

const ResetButton = (props) => {
  if (props.id) {
    return (
      <button type="reset" className="reset" onClick={props.resetForm}>
        <Icon className="fas fa-redo-alt fa-flip-horizontal" />{ " " }
        Reset
      </button>
    )
  } else {
    return null
  }
}

export default ResetButton
