import React from "react"

import { account as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { Link } from "react-router-dom"

export default () => (
  <div className="transactions">
    <Link to="/accounts/index">
      <h3>{titleize(copy.manageLinkText)}</h3>
    </Link>
  </div>
)
