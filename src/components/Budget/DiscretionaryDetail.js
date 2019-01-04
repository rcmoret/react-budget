import React, { Component } from 'react'
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'
import Details from './Details'
import Transactions from './Transactions'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const SpentOrDeposited = (props) => {
  if (props.spent > 0) {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Deposited: </div>
        <div className="detail-amount underscore"> + {MoneyFormatter(props.spent)}</div>
      </div>
    )
  } else {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">
          Spent:
        </div>
        <div className="detail-amount underscore">
          - {MoneyFormatter(props.spent, { absolute: true })}
        </div>
      </div>
    )
  }
}

const OverUnderBudget = (props) => {
  if (props.over_under_budget === 0) {
    return null
  } else if (props.over_under_budget > 0) {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Under Budget:</div>
        <div className='detail-amount'> + {MoneyFormatter(props.over_under_budget)}</div>
      </div>
    )
  } else {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Over Budget: </div>
        <div className='detail-amount'> - {MoneyFormatter(props.over_under_budget, { absolute: true })} </div>
      </div>
    )
  }
}

class DiscretionaryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      ...props
    }
  }

  componentWillMount() {
    fetch(ApiUrlBuilder('budget', 'discretionary', 'transactions'))
      .then(response => response.json())
      .then(data => this.setState({
        transactions: data
        })
     )
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.showDetail) {
      return (
        <div>
          <OverUnderBudget {...this.state} />
          <SpentOrDeposited {...this.state} />
          <div className="budget-item-detail remaining">
            <div className="detail-description">Remaining: </div>
            <div className="detail-amount"> {MoneyFormatter(this.state.remaining)} </div>
          </div>
          <hr />
          <Details {...this.state} />
          <hr />
          <Transactions {...this.state} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default DiscretionaryDetail;
