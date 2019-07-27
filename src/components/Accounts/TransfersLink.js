import React from "react"

import { account as accountCopy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { Link } from "react-router-dom"

export default () => (
  <div className="transfers-link">
    <Link to="/accounts/transfers">
      <h3>
        {titleize(accountCopy.transferLinkText)}
        {" "}
        <i className="fas fa-exchange-alt" />
      </h3>
    </Link>
  </div>
)
