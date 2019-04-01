import React, { Component } from "react"
import { connect } from 'react-redux';
import { fetched } from "../../actions/accounts"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import Details from "./Details"
import Tab from "./Tab"

class Wrapper extends Component {
  componentDidMount() {
    const url = ApiUrlBuilder(["accounts"])
    fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(fetched(data)))
  }

  render() {
    const { collection, month, year, selectedAccountId } = this.props
    return (
      <div className="accounts">
        {collection.map(account =>
          <Tab
            key={account.id}
            {...account}
            selectedAccountId={selectedAccountId}
          />
        )}
        <Details
          selectedAccountId={selectedAccountId}
          month={month}
          year={year}
        />
        <hr/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedAccountId = parseInt(ownProps.match.params.id || 0)
  const today = new Date()
  const month = parseInt(ownProps.match.params.month) || today.getMonth() + 1
  const year = parseInt(ownProps.match.params.year) || today.getFullYear()
  const collection = state.accounts.collection.sort((a, b) => {
    return a.priority - b.priority
  })
  return {
    collection: collection,
    selectedAccountId: selectedAccountId,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(Wrapper)
