import React from "react"

import { Link } from "react-router-dom"
import * as dateFormatter from "../../shared/Functions/DateFormatter"

export default ({ month, year, isFuture, requiresSetUp }) => {
  if (requiresSetUp && isFuture) {
    const monthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })
    return (
      <div>
        <Link
          to={`/budget/set-up/${month}/${year}`}
        >
          <div className="set-up-link">
            <h3>Set up {monthString}</h3>
          </div>
        </Link>
      </div>
    )
  } else {
    return null
  }
}
