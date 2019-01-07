import React, { Component } from 'react';
import AccountEdit from './AccountEdit';
import NewAccount from './NewAccount';
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'

class AccountsIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      ...props
    }
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder('accounts'))
      .then(response => response.json())
      .then(data => this.setState({
        accounts: data,
        })
     )
  }

  onSave(data) {
    const { accounts } = this.state
    accounts.push(data)
    this.setState({ accounts: accounts })
  }

  // componentWillReceiveProps(nextProps, prevState) {
  //   this.setState(nextProps)
  // }

  render() {
    return (
      <div className="accounts">
        <div className="account-show">
          {this.state.accounts.map((account) =>
             <AccountEdit
               key={account.id}
               {...account}
             />
            )
          }
          <NewAccount {...this.state} onSave={this.onSave} />
        </div>
      </div>
    );
  }
}

export default AccountsIndex
