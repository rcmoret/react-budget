import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ index, detail, onDetailChange, onKeyDown }) => {
  const onChange = (e) => {
    onDetailChange(_id, { amount: e.target.value })
  }

  const {
    id,
    amount,
    disabled,
  } = detail

  const _id = id || index

  return (
    <div className="detail-amount">
      <input
        type="text"
        name={`detail[${_id}][amount]`}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={copy.amount}
        value={amount}
      />
    </div>
  )
}
