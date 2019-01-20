import React from "react"

const Submit = (props) => (
  <div className="transaction-submit">
    <button type="submit" onClick={props.submitTransaction}>
      Create Transaction
    </button>
  </div>
)

export default Submit
