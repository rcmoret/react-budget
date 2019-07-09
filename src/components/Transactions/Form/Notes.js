import React from "react"

export default ({ notes, handleKeyDown, onChange }) => {
  const update = (e) => {
    onChange({ notes: e.target.value })
  }

  return (
    <div className="input-notes">
      <textarea
        placeholder="notes"
        name="notes"
        value={notes || ""}
        onChange={update}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
