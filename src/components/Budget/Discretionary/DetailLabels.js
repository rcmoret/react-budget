import React from "react"

export default ({ descriptor, spentOrDeposited, showDetail }) => {
  if (showDetail) {
    return (
      <div>
        <div>
          {descriptor}
        </div>
        <div className="spent-or-deposited">
          {spentOrDeposited}
        </div>
        <div className="budget-item-difference">
          Remaining
        </div>
      </div>
    )
  } else {
    return null
  }
}
