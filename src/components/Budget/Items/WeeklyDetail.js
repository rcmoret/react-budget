import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { fetchedWeeklyTransactions } from "../../../actions/budget"
import Details from "../Shared/Details"
import Transactions from "../Shared/Transactions"

class WeeklyDetail extends Component {
  componentDidUpdate() {
    const { budget_category_id, collection, id, showDetail, transaction_count } = this.props
    const url = ApiUrlBuilder(
      ["budget", "categories", budget_category_id, "items", id, "transactions"]
    )
    if (collection.length < transaction_count && showDetail) {
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(
          fetchedWeeklyTransactions({ id: id, collection: data }))
        )
    }
  }

  render() {
    if (this.props.showDetail) {
      const { budgetedPerDay, budgetedPerWeek, collection,
              name, remainingPerDay, remainingPerWeek } = this.props
      return (
        <div className="detail-wrapper">
          <hr />
          <Details
            budgetedPerDay={budgetedPerDay}
            budgetedPerWeek={budgetedPerWeek}
            remainingPerDay={remainingPerDay}
            remainingPerWeek={remainingPerWeek}
          />
          <hr />
          <Transactions
            budgetCategory={name}
            collection={collection}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

export default connect((_state, ownProps) => ownProps)(WeeklyDetail)
