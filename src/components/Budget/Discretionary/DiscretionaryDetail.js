import React, { Component } from 'react'
import Details from '../Shared/Details'
import OverUnderBudget from "./OverUnderBudget"
import Remaining from '../Shared/Remaining'
import SpentOrDeposited from '../Shared/SpentOrDeposited'
import Transactions from './../Shared/Transactions'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'

class DiscretionaryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.url = this.url.bind(this)
  }

  componentWillReceiveProps(nextProps) {
      this.setState(nextProps)
  }

  url() {
    return ApiUrlBuilder(['budget', 'discretionary', 'transactions'])
  }

  render() {
    if (this.state.showDetail) {
      const { expense, over_under_budget, remaining, spent } = this.state
      const { budgeted_per_day, budgeted_per_week, remaining_per_day, remaining_per_week } = this.state
      return (
        <div className="detail-wrapper">
          <OverUnderBudget overUnderBudget={over_under_budget} />
          <SpentOrDeposited expense={expense} spent={spent} />
          <Remaining remaining={remaining} />
          <hr />
          <Details
            budgetedPerDay={budgeted_per_day}
            budgetedPerWeek={budgeted_per_week}
            remainingPerDay={remaining_per_day}
            remainingPerWeek={remaining_per_week}
          />
          <hr />
          <Transactions
            budgetCategory="Discretionary"
            url={this.url()}
          />
        </div>
      )
    } else {
      return null
    }
  }
}

DiscretionaryDetail.defaultProps = {
}

export default DiscretionaryDetail;
