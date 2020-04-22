import React from "react"

import { Link } from "react-router-dom"

import { transaction as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

export default ({ budget_exclusion, formOptions, onChange, selectedAccount, toggleFormOption }) => {
  const update = () => {
    onChange({ budget_exclusion: !budget_exclusion })
  }

  if (selectedAccount.cash_flow === true || !formOptions.showBudgetExclusion) {
    return null
  } else {
    return (
      <div className="option-input">
        <Link to="#" onClick={toggleFormOption} name="showBudgetExclusion" className="fas fa-exclamation" />
        <div className="form-budget-exclusion">
          <div className="label">
            {titleize(copy.budgetExclusion)}
          </div>
          <div className="input">
            <input
              type="checkbox"
              value={budget_exclusion || false}
              onChange={update}
              checked={budget_exclusion ? "checked" : ""}
            />
          </div>
        </div>
      </div>
    )
  }
}
