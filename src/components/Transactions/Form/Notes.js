import React from "react"

export default ({ notes, onChange }) => {
  const update = (e) => {
    onChange({ notes: e.target.value })
  }

  return (
    <div className="input-notes">
      <textarea
        placeholder="notes"
        name="notes"
        value={notes}
        onChange={update}
      />
    </div>
  )
}
