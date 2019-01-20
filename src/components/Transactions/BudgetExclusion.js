import React from "react"

const BudgetExclusion = (props) => {
  if (props.budgetExclusion) {
    return (
      <div className="exclusion">
        {props.budgetExclusion ? "budget exclusion" : ""}
      </div>
    )
  } else {
    return null
  }
}

export default BudgetExclusion
