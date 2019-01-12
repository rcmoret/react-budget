import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AccountOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  render() {
    return (
      <div className="transactions">
        <Link to="/accounts/index">
          <h3>Manage Accounts</h3>
        </Link>
      </div>
    )
  }
}

export default AccountOptions;
