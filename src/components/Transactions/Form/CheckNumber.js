import React from "react"

import { transaction as copy } from "../../../locales/copy"

import Icon from "../../Icons/Icon"

export default ({ check_number, onChange }) => {
  const update = (e) => {
    onChange({ check_number: e.target.value })
  }

  return(
    <div className="check-number">
      <Icon className="fas fa-money-check" />&nbsp;
      <input
        type="text"
        name="check_number"
        value={check_number}
        onChange={update}
        placeholder={copy.checkNumberPlaceholder}
      />
    </div>
  )
}
