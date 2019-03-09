import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchedDiscretionaryTransactions } from "../../../actions/budget"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import Details from "../Shared/Details"
import Transactions from "./../Shared/Transactions"

class DiscretionaryDetail extends Component {
  componentDidUpdate() {
    const { dispatch, fetchedTransactions, month, showDetail, year } = this.props
    const url = ApiUrlBuilder(["budget", "discretionary", "transactions"], { month: month, year: year })
    if (showDetail && !fetchedTransactions ) {
      fetch(url)
        .then(response => response.json())
        .then(data => dispatch(fetchedDiscretionaryTransactions(data)))
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

const mapStateToProps = (state) => {
  return { ...state.budget.metadata, ...state.budget.discretionary }
}

export default connect(mapStateToProps)(DiscretionaryDetail)
