import React from "react"

import { transaction as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import Icon from "../../Icons/Icon"

export default ({ checkNumber }) => {
  if (checkNumber) {
    return (
      <div className="check-number">
        <Icon className="fas fa-money-check" /> {titleize(copy.check)}: {checkNumber}
      </div>
    )
  } else {
    return null
  }
}
