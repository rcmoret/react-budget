import React from "react"

import { Link } from "react-router-dom"

export default ({ deletable, onClick }) => {
  if (deletable) {
    return (
      <div className="transaction-delete-button">
        <Link
          className="fas fa-trash-alt"
          to="#"
          onClick={onClick}
        />
      </div>
    )
  } else {
    return null
  }
}
