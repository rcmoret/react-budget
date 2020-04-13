import React from "react"

import { transaction as copy } from "../../../locales/copy"

import * as DateFormatter from "../../../functions/DateFormatter"

export default ({ clearanceDate }) => {
  const longDate = clearanceDate === null ? copy.pending : DateFormatter.fromDateString(clearanceDate)
  const shortDate = clearanceDate === null ? copy.pending : DateFormatter.fromDateString(clearanceDate, { format: "m/d" })

  return (
    <div className="clearance-date">
      <ShortDateSpan clearanceDate={clearanceDate} shortDate={shortDate} />
      <span className="long-date">
        {longDate}
      </span>
    </div>
  )
}

const ShortDateSpan = ({ clearanceDate, shortDate }) => (
  <span className={`short-date ${clearanceDate === null ? copy.pending : ""}`}>
    {shortDate}
  </span>
)
