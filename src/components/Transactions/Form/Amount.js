import React from "react"

import { transaction as copy } from "../../../locales/copy"

import DetailAmount from "./DetailAmount"

export default ({ details, handleKeyDown, onDetailChange }) => {
  if (details.length > 1) {
    const total = details.reduce((acc, detail) => acc + (parseFloat(detail.amount) || 0), 0)
    return (
      <div className="amount">
        <input
          type="text"
          name="amount"
          value={parseFloat(total).toFixed(2)}
          disabled={true}
        />
        {details.map((detail, index) =>
          <DetailAmount
            key={index}
            _id={detail.id || index}
            amount={detail.amount}
            onKeyDown={handleKeyDown}
            onDetailChange={onDetailChange}
          />
        )}
      </div>
    )
  } else {
    const detail = details[0]
    const _id = detail._id || 0
    const update = (e) => {
      onDetailChange(_id, { amount: e.target.value })
    }

    return (
      <div className="amount">
        <input type="text"
          name={`detail[${_id}][amount]`}
          onChange={update}
          placeholder={copy.amount}
          value={detail.amount}
        />
      </div>
    )
  }
}
