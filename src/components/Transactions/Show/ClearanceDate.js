import React from "react"

import { transaction as copy } from "../../../locales/copy"

import * as DateFormatter from "../../../functions/DateFormatter"

export default ({ clearanceDate }) => {
  const displayDate = clearanceDate === null ? copy.pending : DateFormatter.fromDateString(clearanceDate)

  return (
    <div className="clearance-date">
      {displayDate}
    </div>
  )
}
