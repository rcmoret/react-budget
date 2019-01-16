import React, { Component } from 'react'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'
import Details from './Details'
import SpentOrDeposited from './SpentOrDeposited'
import Transactions from './Transactions'

class WeeklyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      showDetail: false,
      ...props
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.showDetail) {
      fetch(ApiUrlBuilder(['budget', 'categories', this.state.category_id, 'items', this.state.id, 'transactions']))
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
          <SpentOrDeposited {...this.state} />
          <div className="budget-item-detail">
            <div className="detail-description remaining">Remaining: </div>
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

export default WeeklyDetail;
