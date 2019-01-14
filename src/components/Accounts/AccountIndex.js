import React, { Component } from "react"
import AccountShow from "./AccountShow"
import NewAccount from "./NewAccount"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"

class AccountsIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      ...props
    }
    this.onSave = this.onSave.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.orderedAccounts = this.orderedAccounts.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder(["accounts"]))
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

  onUpdate(data) {
    const { accounts } = this.state
    const index = accounts.findIndex((act) => act.id === data.id)
    accounts[index] = data
    this.setState({accounts})
  }

  orderedAccounts() {
    return this.state.accounts.sort((a, b) => {
      return a.priority - b.priority
    })
  }

  render() {
    return (
      <div className="accounts">
        <div className="account-show">
          {this.orderedAccounts().map((account) =>
            <AccountShow
              key={account.id}
              {...account}
              onUpdate={this.onUpdate}
            />
          )
          }
          <NewAccount {...this.state} onSave={this.onSave} />
        </div>
      </div>
    )
  }
}

export default AccountsIndex
