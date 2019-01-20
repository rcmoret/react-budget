import React from "react"
import Icon from "../Icons/Icon"

const Description = (props) => {
  if (props.description === null) {
    return (
      <div className="description">
        {props.budgetCategory}&nbsp;
        <Icon className={props.iconClassName} />
      </div>
    )
  } else {
    return (
      <div className="description">
        {props.description}
      </div>
    )
  }
}

export default Description
