import React from "react"

import { Link } from "react-router-dom"

export default ({ collapseDetail, details, expandDetail, showDetail }) => {
  if (details.length < 2) {
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
