import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchedAccounts } from "../../actions/accounts"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import IndexContainer from "./IndexContainer"

class AccountsIndex extends Component {
  componentWillMount() {
    if (this.props.accounts.length === 0) {
      fetch(ApiUrlBuilder(["accounts"]))
        .then(response => response.json())
        .then(data => this.props.dispatch(fetchedAccounts(data)))
    }
  }

  render() {
    return (
      <IndexContainer collection={this.props.accounts} />
    )
  }
}

AccountsIndex.defaultProps = {
  accounts: [],
}

const mapStateToProps = (state) => {
  const { collection } = state.accounts
  const accounts = collection.sort((a, b) => {
    return a.priority - b.priority
  })

  return { accounts: state.accounts.collection }
}

export default connect(mapStateToProps)(AccountsIndex)
