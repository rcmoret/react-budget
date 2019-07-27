import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ _id, amount, onSubChange }) => {
  const onChange = (e) => {
    onSubChange(_id, { amount: e.target.value })
  }

  return (
    <div className="subtransaction">
      <input
        type="text"
        name={`subtransaction[${_id}][amount]`}
        onChange={onChange}
        placeholder={copy.amount}
        value={amount}
      />
    </div>
  )
}
