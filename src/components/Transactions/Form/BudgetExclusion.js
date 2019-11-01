import React from "react"

import { transaction as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

export default ({ budget_exclusion, onChange, selectedAccount }) => {
  const update = () => {
    onChange({ budget_exclusion: !budget_exclusion })
  }

  if (selectedAccount.cashFlow === true) {
    return null
  } else {
    return (
      <div className="budget-exclusion">
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
    )
  }
}
