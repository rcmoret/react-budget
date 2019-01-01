import React, { Component } from 'react';
import Account from './Account';
import Transactions from './Transactions';
import API_URL from '../../shared/Constants/Api';

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      ...props
    }
  }

  componentWillMount() {
    fetch(API_URL + '/accounts')
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
    if (Object.keys(this.state.match.params).length === 0) {
      return null
    } else {
      return parseInt(this.state.match.params.id)
    }
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
        <hr/>
      </div>
    );
  }
}

export default Accounts
