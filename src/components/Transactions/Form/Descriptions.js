import React from "react"

import SubtransactionDescription from "./SubtransactionDescription"

export default ({ description, handleKeyDown, onChange, onSubChange, subtransactions }) => {
  const update = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <div className="description">
      <input
        type="text"
        name="description"
        placeholder="description"
        onChange={update}
        onKeyDown={handleKeyDown}
        value={description || ""}
      />
      {subtransactions.map((sub, index) =>
        <SubtransactionDescription
          key={`sub-${sub.id || index}-description`}
          _id={sub.id || index}
          description={sub.description}
          onSubChange={onSubChange}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  )
}
