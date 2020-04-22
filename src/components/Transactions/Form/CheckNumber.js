import React from "react"

import { transaction as copy } from "../../../locales/copy"

import { Link } from "react-router-dom"

export default ({ formOptions, check_number, onChange, toggleFormOption }) => {
  const update = (e) => {
    onChange({ check_number: e.target.value })
  }

  if (formOptions.showCheck) {
    return(
      <div className="option-input check-number">
        <Link to="#" onClick={toggleFormOption} name="showCheck" className="fas fa-money-check" />&nbsp;
        <input
          type="text"
          name="check_number"
          value={check_number}
          onChange={update}
          placeholder={copy.checkNumberPlaceholder}
        />
      </div>
    )
  } else {
    return null
  }
}
