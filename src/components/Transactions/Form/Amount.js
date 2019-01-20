import React from "react"

const Amount = (props) => (
  <div className="amount">
    <input
     type="text"
     name="amount"
     placeholder="amount"
     value={props.amount}
     onChange={props.updateTransaction}
     disabled={props.disabled}
    />
  </div>
)

export default Amount
