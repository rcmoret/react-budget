import React from "react"

export default ({ descriptor, showDetail }) => {
  if (showDetail) {
    return (
      <div>
        <div className="spent-or-deposited">
          {descriptor}
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
