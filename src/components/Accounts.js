import React, { Component } from 'react';
import Account from './Account';
import Transactions from './Transactions';

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      ...props
    }
  }

  componentWillMount() {
    fetch('http://192.168.1.81:8088/accounts')
      .then(response => response.json())
      .then(data => this.setState({
        accounts: data,
        })
     )
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  selectedAccountId() {
    return parseInt(this.state.match.params.id)
  }

  render() {
    return (
      <div className="accounts">
        {this.state.accounts.map((account) =>
           <Account
             key={account.id}
             {...account}
             activeAccount={this.selectedAccountId()}
           />
          )
        }
        <Transactions activeAccount={this.selectedAccountId()} />
      </div>
    );
  }
}

export default Accounts
