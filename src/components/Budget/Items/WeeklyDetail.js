import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import { fetchedWeeklyTransactions } from "../../../actions/budget"
import Details from "../Shared/Details"
import SpentOrDeposited from "../Shared/SpentOrDeposited"
import Transactions from "../Shared/Transactions"

class WeeklyDetail extends Component {

  componentDidUpdate() {
    const collection = this.props.collection || []
    const { category_id, id } = this.props
    const url = ApiUrlBuilder(['budget', 'categories', category_id, 'items', id, 'transactions'])
    if (collection.length === 0 && this.props.showDetail) {
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(
              fetchedWeeklyTransactions({ id: id, collection: data }))
             )
    }
  }

  render() {
    const collection = this.props.collection || []
    if (this.props.showDetail) {
      const { budgeted_per_day, budgeted_per_week, remaining_per_day, remaining_per_week } = this.props
      return (
        <div className="detail-wrapper">
          <SpentOrDeposited {...this.props} />
          <div className="budget-item-detail">
            <div className="detail-description remaining">Remaining: </div>
            <div className="detail-amount"> {MoneyFormatter(this.props.remaining)} </div>
          </div>
          <hr />
          <Details
            budgetedPerDay={budgeted_per_day}
            budgetedPerWeek={budgeted_per_week}
            remainingPerDay={remaining_per_day}
            remainingPerWeek={remaining_per_week}
          />
          <hr />
          <Transactions
            budgetCategory={this.props.name}
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
