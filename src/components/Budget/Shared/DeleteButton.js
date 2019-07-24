import React from "react"

import { Link } from "react-router-dom"

export default ({ deletable, deleteItem, updateItem }) => {
  if (deletable && !updateItem) {
    return (
      <Link
        to="#"
        className="fas fa-trash-alt"
        onClick={deleteItem}
      />
    )
  } else {
    return null
  }
}
