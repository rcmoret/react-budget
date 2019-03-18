import React from "react"

export default ({ onSubmit }) => (
  <div className="transaction-submit">
    <button type="submit" onClick={onSubmit}>
      Create Transaction
    </button>
  </div>
)
