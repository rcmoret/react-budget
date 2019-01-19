import React from "react"
import { Link } from "react-router-dom"

const AccountOptions = () => (
  <div className="transactions">
    <Link to="/accounts/index">
      <h3>Manage Accounts</h3>
    </Link>
  </div>
)

export default AccountOptions
