import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

class AccountEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  render() {
    return(
      <div className="account-edit">
        <div>
          <h3>
          {this.state.name}
          &nbsp;
          <Link to="#" className="far fa-edit" />
          </h3>
          <div className="cash-flow">
            {this.state.cash_flow ? 'Cash Flow' : 'Non-Cash Flow'}
          </div>
          <div className="balance">
            Balance: {MoneyFormatter(this.state.balance)}
          </div>
          <div className="priority">
            Priority: {this.state.priority}
          </div>
        </div>
      </div>
    )
  }
}

export default AccountEdit;
