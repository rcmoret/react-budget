import React from "react"

export default ({ clearanceDate, handleKeyDown, onChange }) => {
  const update = (e) => {
    onChange({ clearance_date: e.target.value })
  }

  return (
    <div className="clearance-date">
      <input
        type="text"
        name="clearance_date"
        onKeyDown={handleKeyDown}
        placeholder="clearance date"
        onChange={update}
        value={clearanceDate || ""}
      />
    </div>
  )
}
