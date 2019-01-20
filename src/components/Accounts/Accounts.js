import React, { Component } from "react"
import AccountsContainer from "./AccountsContainer"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.selectedAccount = this.selectedAccount.bind(this)
    this.setAccounts = this.setAccounts.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder(["accounts"]))
      .then(response => response.json())
      .then(data => this.setAccounts(data))
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
    this.setAccounts(this.state.accounts, parseInt(nextProps.match.params.id))
  }

  orderedAccounts() {
    return this.state.accounts.sort((a, b) => {
      return a.priority - b.priority
    })
  }

  setAccounts(accounts, accountId = null) {
    const selectedAccountId = accountId === null ? parseInt(this.state.match.params.id) : accountId
    const newAccounts = accounts.map((account) => {
      return {...account, isSelected: (account.id === selectedAccountId)}
    })
    this.setState({ accounts: newAccounts })
  }

  selectedAccount() {
    const account = this.state.accounts.find(account => account.isSelected)
    return account || { id: 0 }
  }

  render() {
    if (this.state.accounts.length === 0) {
      return null
    } else {
      return (
        <AccountsContainer
          accounts={this.orderedAccounts()}
          selectedAccount={this.selectedAccount()}
        />
      )
    }
  }
}

Accounts.defaultProps = {
  accounts: [],
}

export default Accounts
