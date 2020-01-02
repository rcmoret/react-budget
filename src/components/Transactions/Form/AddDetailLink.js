import React from "react"

import { transaction as copy } from "../../../locales/copy"

import Icon from "../../Icons/Icon"

import { Link } from "react-router-dom"

export default ({ addDetail }) => (
  <div className="option">
    <Link to="#" onClick={addDetail} tabIndex="-1">
      <Icon className="fas fa-plus-circle" />
      {" "}
      {copy.addDetail}
    </Link>
  </div>
)
