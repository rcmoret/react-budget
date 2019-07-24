import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ notes, handleKeyDown, onChange }) => {
  const update = (e) => {
    onChange({ notes: e.target.value })
  }

  return (
    <div className="input-notes">
      <textarea
        placeholder={copy.notes}
        name="notes"
        value={notes || ""}
        onChange={update}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
