import React from "react"
import Icon from "../Icons/Icon"

const Notes = (props) => {
  if (props.notes) {
    return(
      <div className="notes">
        <Icon className="fas fa-sticky-note" />&nbsp;
        {props.notes}
      </div>
    )
  } else {
    return null
  }
}

export default Notes
