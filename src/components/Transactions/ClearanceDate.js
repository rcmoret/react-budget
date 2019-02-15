import React from "react"
import * as DateFormatter from "../../shared/Functions/DateFormatter"

const ClearanceDate = (props) => {
  const displayDate = props.clearanceDate === null ? 'pending' : DateFormatter.fromDateString(props.clearanceDate)

  return (
    <div className="clearance-date">
      {displayDate}
    </div>
  )
}

export default ClearanceDate
