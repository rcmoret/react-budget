import React from "react"

import { transaction as copy } from "../../../locales/copy"

import Icon from "../../Icons/Icon"

import { Link } from "react-router-dom"

export default ({ addSubtransaction, subtransactions }) => (
  <div className="option">
    <Link to="#" onClick={addSubtransaction} tabIndex="-1">
      <Icon className="fas fa-plus-circle" />
      {" "}
      {subtransactions.length > 0 ? copy.subtransaction : copy.subtransactions}
    </Link>
  </div>
)
