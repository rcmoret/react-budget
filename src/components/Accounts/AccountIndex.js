import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import IndexContainer from "./IndexContainer"

class AccountsIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      <IndexContainer
        {...this.state}
        accounts={this.orderedAccounts()}
        onUpdate={this.onUpdate}
        onSave={this.onSave}
      />
    )
  }
}

AccountsIndex.defaultProps = {
  accounts: [],
}

export default AccountsIndex
