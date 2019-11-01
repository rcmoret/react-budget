import React from "react"

const Icon = (props) => {
  if (props.iconClassName === null) {
    return (<span></span>)
  } else {
    return (
      <span>
        <i className={props.className}></i>
      </span>
    )
  }
}

export default Icon
