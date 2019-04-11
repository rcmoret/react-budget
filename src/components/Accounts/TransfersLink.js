import React from "react"

import { Link } from "react-router-dom"

export default () => (
  <div className="transfers-link">
    <Link to="/accounts/transfers">
      <h3>
        Inter-account Transfers
        {" "}
        <i className="fas fa-exchange-alt" />
      </h3>
    </Link>
  </div>
)
