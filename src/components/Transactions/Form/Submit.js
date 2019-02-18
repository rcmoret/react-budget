import React from "react"

export default ({ submitTransaction }) => (
  <div className="transaction-submit">
    <button type="submit" onClick={submitTransaction}>
      Create Transaction
    </button>
  </div>
)
