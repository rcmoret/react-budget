import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { formatted } from "../../../functions/DateFormatter"

export default ({ month, year }) => (
  <div className="finalize-title">
    <h2>
      {titleize(copy.finalize.title)} {formatted({ month: month, year: year, day: 1, format: "monthYear" })}</h2>
  </div>
)
