import React, { Component } from 'react'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'
import Details from '../Items/Details'
import SpentOrDeposited from '../Items/SpentOrDeposited'
import Transactions from './../Items/Transactions'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

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

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.showDetail) {
      fetch(ApiUrlBuilder(['budget', 'discretionary', 'transactions']))
        .then(response => response.json())
        .then(data => this.setState({ transactions: data, ...nextProps }))
   } else {
      this.setState(nextProps)
    }
  }

  render() {
    if (this.state.showDetail) {
      return (
        <div className="detail-wrapper">
          <OverUnderBudget {...this.state} />
          <SpentOrDeposited {...this.state} />
          <div className="budget-item-detail">
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
