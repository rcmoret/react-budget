import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchedDiscretionaryTransactions } from "../../../actions/budget"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import Details from "../Shared/Details"
import Transactions from "./../Shared/Transactions"

class DiscretionaryDetail extends Component {
  componentDidUpdate() {
    const url = ApiUrlBuilder(["budget", "discretionary", "transactions"])
    if (this.props.showDetail && !this.props.fetchedTransactions ) {
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(fetchedDiscretionaryTransactions(data)))
    }
  }

  render () {
    if (this.props.showDetail) {
      return (
        <div className="detail-wrapper">
          <hr />
          <Details {...this.props} />
          <hr />
          <Transactions
            budgetCategory="Discretionary"
            collection={this.props.collection}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect(state => state.budget.discretionary)(DiscretionaryDetail)
