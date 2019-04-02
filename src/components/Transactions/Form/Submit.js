import React from "react"

export default ({ buttonText, onSubmit }) => (
  <div className="transaction-submit">
    <button type="submit" onClick={onSubmit}>
      {buttonText}
    </button>
  </div>
)
