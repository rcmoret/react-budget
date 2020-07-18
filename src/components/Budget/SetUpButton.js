import React from "react"

import { budget as copy } from "../../locales/copy"

import * as dateFormatter from "../../functions/DateFormatter"

import { MenuLink } from "./Menu"

export default ({ month, year, isFuture, requiresSetUp }) => {
  const monthString = dateFormatter.formatted({ month: month, year: year, format: "monthYear" })

  if (requiresSetUp && isFuture) {
    return (
      <MenuLink
        linkCopy={copy.menu.setUpLinkText(monthString)}
        path={`/budget/set-up/${month}/${year}/intro`}
      />
    )
  } else {
    return null
  }
}
