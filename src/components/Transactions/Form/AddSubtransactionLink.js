import React from "react"

import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"

export default ({ addSubtransaction, subtransactions }) => (
  <div className="option">
    <Link to="#" onClick={addSubtransaction}>
      <Icon className="fas fa-plus-circle" />
      {" "}
      Add {subtransactions.length > 0 ? "subtransaction" : "subtransactions"}
    </Link>
  </div>
)
