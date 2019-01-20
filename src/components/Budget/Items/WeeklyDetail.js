import React, { Component } from 'react'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'
import Details from '../Shared/Details'
import SpentOrDeposited from "../Shared/SpentOrDeposited"
import Transactions from '../Shared/Transactions'

class WeeklyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  url() {
    const { category_id, id } = this.state
    return ApiUrlBuilder(['budget', 'categories', category_id, 'items', id, 'transactions'])
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.showDetail) {
      const { budgeted_per_day, budgeted_per_week, remaining_per_day, remaining_per_week } = this.state
      return (
        <div className="detail-wrapper">
          <SpentOrDeposited {...this.state} />
          <div className="budget-item-detail">
            <div className="detail-description remaining">Remaining: </div>
            <div className="detail-amount"> {MoneyFormatter(this.state.remaining)} </div>
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
            url={this.url()}
            budgetCategory={this.state.name}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

WeeklyDetail.defaultProps = {
  transactions: [],
  showDetail: false,
}

export default WeeklyDetail;
