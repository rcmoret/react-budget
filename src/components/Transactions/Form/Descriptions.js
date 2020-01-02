import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ description, handleKeyDown, onChange }) => {
  const update = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <div className="description">
      <input
        type="text"
        name="description"
        placeholder={copy.description}
        onChange={update}
        onKeyDown={handleKeyDown}
        value={description || ""}
      />
    </div>
  )
}
