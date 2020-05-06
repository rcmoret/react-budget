import React from "react"

import { account as accountCopy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { Link } from "react-router-dom"

export default () => (
  <div className="transfers-link">
    <h3>
      <Link to="/accounts/transfers">
        {titleize(accountCopy.transferLinkText)}
        {" "}
        <i className="fas fa-exchange-alt" />
      </Link>
    </h3>
  </div>
)
