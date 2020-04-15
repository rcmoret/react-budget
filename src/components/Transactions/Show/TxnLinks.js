import React from "react"

import DeleteButton from "./DeleteButton"
import EditLink from "./EditLink"

export default ({ id, revealForm, showDetail, transactionDelete }) => {
  if (id === 0 || !showDetail) {
    return null
  } else {
    return (
      <div className="transaction-row txn-links">
        <EditLink onClick={revealForm} />
        <DeleteButton onClick={transactionDelete} />
      </div>
    )
  }
}
