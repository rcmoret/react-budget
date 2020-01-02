import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ _id, amount, onDetailChange }) => {
  const onChange = (e) => {
    onDetailChange(_id, { amount: e.target.value })
  }

  return (
    <div className="detail">
      <input
        type="text"
        name={`detail[${_id}][amount]`}
        onChange={onChange}
        placeholder={copy.amount}
        value={amount}
      />
    </div>
  )
}
