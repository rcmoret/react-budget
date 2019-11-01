import React from "react"

import { transaction as copy } from "../../../locales/copy"

import Icon from "../../Icons/Icon"

export default ({ checkNumber, onChange }) => {
  const update = (e) => {
    onChange({ checkNumber: e.target.value })
  }

  return(
    <div className="check-number">
      <Icon className="fas fa-money-check" />&nbsp;
      <input
        type="text"
        name="checkNumber"
        value={checkNumber}
        onChange={update}
        placeholder={copy.checkNumberPlaceholder}
      />
    </div>
  )
}
