import React from "react"

export default ({ budget_exclusion, onChange, selectedAccount }) => {
  if (selectedAccount.cash_flow === true) {
    return null
  } else {
    return (
      <div className="budget-exclusion">
        <div className="label">
          Budget Exclusion
        </div>
        <div className="input">
          <input
           type="checkbox"
           value={budget_exclusion}
           onChange={onChange}
           checked={budget_exclusion ? 'checked' : ''}
          />
       </div>
     </div>
    )
  }
}
