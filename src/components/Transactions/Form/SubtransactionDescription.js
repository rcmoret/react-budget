import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ _id, description, onSubChange }) => {
  const onChange = (e) => {
    onSubChange(_id, { description: e.target.value })
  }

  return (
    <div className="subtransaction">
      <input
        type="text"
        name="description"
        placeholder={copy.description}
        onChange={onChange}
        value={description}
      />
    </div>
  )
}
