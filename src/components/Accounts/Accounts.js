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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
      const { month, year, selectedAccountId } = this.props
      return (
        <AccountsContainer
          selectedAccountId={selectedAccountId}
          month={month}
          year={year}
        />
      )
  }
}

const mapStateToProps = (_state, ownProps) => {
  const selectedAccountId = parseInt(ownProps.match.params.id || 0)
  const today = new Date()
  const month = parseInt(ownProps.match.params.month) || today.getMonth() + 1
  const year = parseInt(ownProps.match.params.year) || today.getFullYear()
  return {
    selectedAccountId: selectedAccountId,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(Accounts)
