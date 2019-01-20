import React from "react"
import DateFormatter from "../../shared/Functions/DateFormatter"

const ClearanceDate = (props) => {
  const displayDate = props.clearanceDate === null ? 'pending' : DateFormatter(props.clearanceDate)

  return (
    <div className="clearance-date">
      {displayDate}
    </div>
  )
}

export default ClearanceDate
