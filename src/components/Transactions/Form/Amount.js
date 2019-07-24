import React from "react"

import { transaction as copy } from "../../../locales/copy"

import SubtransactionAmount from "./SubtransactionAmount"

export default ({ amount, handleKeyDown, onChange, onSubChange, subtransactions }) => {
  const update = (e) => {
    onChange({ amount: e.target.value })
  }

  if (subtransactions.length > 0) {
    const total = subtransactions.reduce((acc, sub) => acc + (parseFloat(sub.amount) || 0), 0)
    return (
      <div className="amount">
        <input
          type="text"
          name="amount"
          value={parseFloat(total).toFixed(2)}
          disabled={true}
        />
        {subtransactions.map((sub, index) =>
          <SubtransactionAmount
            key={index}
            _id={sub.id || index}
            amount={sub.amount}
            onKeyDown={handleKeyDown}
            onSubChange={onSubChange}
          />
        )}
      </div>
    )
  } else {
    return (
      <div className="amount">
        <input
          type="text"
          name="amount"
          placeholder={copy.amount}
          value={amount}
          onChange={update}
          onKeyDown={handleKeyDown}
          disabled={false}
        />
      </div>
    )
  }
}
