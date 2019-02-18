import React from "react"
import SubtransactionForm from "./SubtransactionForm"

export default ({ subtransactions }) => {
  if (subtransactions.length === 0) {
    return null
  } else {
    return (
      <div className="transaction-form-row">
        <div className="subtransaction-form">
          {subtransactions.map(sub =>
            <SubtransactionForm
             key={sub._id}
             {...sub}
            />
          )}
        </div>
      </div>
    )
  }
}
