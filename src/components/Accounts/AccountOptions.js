import React from "react"
import { Link } from "react-router-dom"

export default () => (
  <div className="transactions">
    <Link to="/accounts/index">
      <h3>Manage Accounts</h3>
    </Link>
  </div>
)
