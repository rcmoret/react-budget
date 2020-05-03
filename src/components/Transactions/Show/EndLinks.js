import React from "react"

import EditLink from "./EditLink"
import DeleteButton from "./DeleteButton"

export default ({ revealForm, transactionDelete }) => (
  <div className="end-links">
    <EditLink onClick={revealForm} />
    <DeleteButton onClick={transactionDelete} />
  </div>
)

