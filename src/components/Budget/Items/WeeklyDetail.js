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
    const { collection, difference, expense, overUnderBudget } = this.props
    const operator = !overUnderBudget ? "" : (expense ? "-" : "+")
    if (this.props.showDetail) {
      const { budgetedPerDay, budgetedPerWeek, remainingPerDay, remainingPerWeek } = this.props
      return (
        <div className="detail-wrapper">
          <SpentOrDeposited {...this.props} />
          <div className="budget-item-detail">
            <div className="detail-description remaining">Remaining: </div>
            <div className="detail-amount">
              {operator} {MoneyFormatter(difference, { absolute: true })}
            </div>
          </div>
          <hr />
          <Details
            budgetedPerDay={budgetedPerDay}
            budgetedPerWeek={budgetedPerWeek}
            remainingPerDay={remainingPerDay}
            remainingPerWeek={remainingPerWeek}
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
