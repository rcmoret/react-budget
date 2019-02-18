import React from "react"

export default ({ budgetExclusion }) => {
  if (budgetExclusion) {
    return (
      <div className="exclusion">
        budget exclusion
      </div>
    )
  } else {
    return null
  }
}
