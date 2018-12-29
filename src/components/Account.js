import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  render({ id, name, balance, activeAccount } = this.props) {
    return(
      <Link to={`/accounts/${id}`}>
        <div className={`account ${activeAccount  === id ? 'active' : '' }`}>
          <h4>{name}</h4>
          <p>${parseFloat(balance / 100.0).toFixed(2)}</p>
        </div>
      </Link>
    )
  }
}

export default Account;
