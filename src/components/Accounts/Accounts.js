import React, { Component } from "react"
import { connect } from 'react-redux';
import { fetchedAccounts } from "../../actions/accounts"
import AccountsContainer from "./AccountsContainer"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"

class Accounts extends Component {
  componentDidMount() {
    const url = ApiUrlBuilder(["accounts"])
    fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(fetchedAccounts(data)))
  }

  render() {
      const selectedAccountId = parseInt(this.props.match.params.id || 0)
      return (
        <AccountsContainer selectedAccountId={selectedAccountId} />
      )
  }
}

export default connect((_state, ownProps) => ownProps)(Accounts)
