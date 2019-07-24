import React from "react"

import { Link } from "react-router-dom"

export default ({ collapseDetail, expandDetail, showDetail, subtransactions }) => {
  if (subtransactions.length === 0) {
    return null
  } else if (showDetail) {
    return (
      <Link className='fas fa-caret-down' to='#' onClick={collapseDetail} />
    )
  } else {
    return (
      <Link className='fas fa-caret-right' to='#' onClick={expandDetail} />
    )
  }
}
