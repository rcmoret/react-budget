import React from "react"

import { budget as copy } from "../../locales/copy"

import * as dateFormatter from "../../functions/DateFormatter"

import { Link } from "react-router-dom"

export default ({ month, year, isFuture, requiresSetUp }) => {
  if (requiresSetUp && isFuture) {
    const monthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })
    return (
      <Link
        to={`/budget/set-up/${month}/${year}/intro`}
      >
        <div className="budget-action">
          <strong>{copy.menu.setUpLinkText(monthString)}</strong>
        </div>
      </Link>
    )
  } else {
    return null
  }
}
