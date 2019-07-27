import React from "react"

import { Link } from "react-router-dom"

const Caret = ({ collapseDetail, expandDetail, showDetail }) => {
  if (showDetail) {
    return (
      <Link
        to="#"
        className="fas fa-caret-down"
        onClick={collapseDetail}
      />
    )
  } else {
    return (
      <Link
        to="#"
        className="fas fa-caret-right"
        onClick={expandDetail}
      />
    )
  }
}

export default Caret
