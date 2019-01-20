import React from "react"

const BudgetExclusion = (props) => {
  if (props.selectedAccount.cash_flow === true) {
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
           value={props.budget_exclusion}
           onChange={props.onChange}
           checked={props.budget_exclusion ? 'checked' : ''}
          />
       </div>
     </div>
    )
  }
}

export default BudgetExclusion
