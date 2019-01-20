import React from "react"
import Icon from "../Icons/Icon"

const CheckNumber = (props) => {
  if (props.checkNumber) {
    return (
      <div className="check-number">
        <Icon className="fas fa-money-check" />&nbsp;
        Check: {props.checkNumber}
      </div>
    )
  } else {
    return null
  }
}

export default CheckNumber
