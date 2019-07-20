import React from "react"
import * as DateFormatter from "../../../functions/DateFormatter"

export default ({ clearanceDate }) => {
  const displayDate = clearanceDate === null ? 'pending' : DateFormatter.fromDateString(clearanceDate)

  return (
    <div className="clearance-date">
      {displayDate}
    </div>
  )
}
