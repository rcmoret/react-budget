import React from "react"

const Notes = (props) => (
  <div className="input-notes">
    <textarea
      placeholder="notes"
      name="notes"
      value={props.notes}
      onChange={props.updateTransaction}
    />
  </div>
)

export default Notes
