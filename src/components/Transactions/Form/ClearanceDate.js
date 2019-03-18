import React from "react"

export default ({ clearanceDate, onChange }) => {
  const update = (e) => {
    onChange({ clearance_date: e.target.value })
  }

  return (
    <div className="clearance-date">
      <input
       type="text"
       name="clearance_date"
       placeholder="clearance date"
       onChange={update}
       value={clearanceDate}
      />
    </div>
  )
}
