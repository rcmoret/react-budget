import React from "react"

const ClearanceDate = (props) => (
  <div className="clearance-date">
    <input
     type="text"
     name="clearance_date"
     placeholder="clearance date"
     onChange={props.updateTransaction}
     value={props.clearanceDate}
    />
  </div>
)

export default ClearanceDate
