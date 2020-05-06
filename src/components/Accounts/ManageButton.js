import React from "react"

import { account as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { Link } from "react-router-dom"

export default () => (
  <div className="transactions">
    <h3>
      <Link to="/accounts/index">
        {titleize(copy.manageLinkText)}
      </Link>
    </h3>
  </div>
)
