import React from "react"
import Icon from "../../Icons/Icon"

export default ({ checkNumber }) => {
  if (checkNumber) {
    return (
      <div className="check-number">
        <Icon className="fas fa-money-check" /> Check: {checkNumber}
      </div>
    )
  } else {
    return null
  }
}
