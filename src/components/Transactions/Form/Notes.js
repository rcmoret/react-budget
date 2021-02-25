import React from "react"

import { Link } from "react-router-dom"

import { transaction as copy } from "../../../locales/copy"

export default ({ formOptions, notes, handleKeyDown, onChange, toggleFormOption }) => {
  const update = (e) => {
    onChange({ notes: e.target.value })
  }

  if (formOptions.showNotes) {
    return (
      <div className="option-input">
        <Link to="#" onClick={toggleFormOption} name="showNotes" className="fas fa-sticky-note" />
        <textarea
          placeholder={copy.notesPlacholder}
          name="notes"
          value={notes || ""}
          onChange={update}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  } else {
    return null
  }
}
