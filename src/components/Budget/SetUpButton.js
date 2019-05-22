import React from "react"

import { Link } from "react-router-dom"
import * as dateFormatter from "../../shared/Functions/DateFormatter"

export default ({ month, year, isFuture, requiresSetUp }) => {
  if (requiresSetUp && isFuture) {
    const monthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })
    return (
      <Link
        to={`/budget/set-up/${month}/${year}/intro`}
      >
        <div className="budget-action">
          <strong>Set up {monthString}</strong>
        </div>
      </Link>
    )
  } else {
    return null
  }
}
