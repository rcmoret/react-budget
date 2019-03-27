import React from "react"

import { Link } from "react-router-dom"

export default (props) => {
  if (props.deletable) {
    return (
      <div className="transaction-delete-button">
        <Link
          className="fas fa-trash-alt"
          to="#"
          onClick={props.onClick}
        />
      </div>
    )
  } else {
    return null
  }
}
