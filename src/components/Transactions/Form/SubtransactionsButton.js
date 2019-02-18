import React from "react"
import { Link } from "react-router-dom"
import Icon from "../../Icons/Icon"

const SubtransactionsButton = ({ addSubtransaction, addSubtransactions, subtransactions }) => {
  if (subtransactions.length === 0) {
    return (
      <div className="add-subtransactions">
        <Link to="#" onClick={addSubtransactions}>
          <Icon className="fas fa-plus-circle" />
          {" "}
          Add Subtransactions
        </Link>
      </div>
    )
  } else {
    return (
      <div className="add-subtransactions">
        <Link to="#" onClick={addSubtransaction}>
          <Icon className="fas fa-plus-circle" />
          {" "}
          Add Subtransaction
        </Link>
      </div>
    )
  }
}

export default SubtransactionsButton;
