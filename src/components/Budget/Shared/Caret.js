import React from 'react'
import { Link } from 'react-router-dom'

const Caret = (props) => {
  if (props.showDetail) {
    return (
      <Link
        to="#"
        className="fas fa-caret-down"
        onClick={props.collapseDetail}
      />
    )
  } else {
    return (
      <Link
        to="#"
        className="fas fa-caret-right"
        onClick={props.expandDetail}
      />
    )
  }
}

export default Caret;
