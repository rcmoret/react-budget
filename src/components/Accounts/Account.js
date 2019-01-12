import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  render({ id, name, balance } = this.state) {
    return(
      <Link to={`/accounts/${id}`}>
        <div className={`account ${this.state.isSelected ? 'active' : '' }`}>
          <h3>{name}</h3>
          <hr/>
          <p className="balance">{MoneyFormatter(balance)}</p>
        </div>
      </Link>
    )
  }
}

export default Account;
