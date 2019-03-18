import React from "react"
import Icon from "../../Icons/Icon"

export default ({ notes }) => {
  if (notes) {
    return(
      <div className="notes">
        <Icon className="fas fa-sticky-note" /> {notes}
      </div>
    )
  } else {
    return null
  }
}
