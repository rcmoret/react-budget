import React, { Component } from 'react';

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.displayDate = this.displayDate.bind(this)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  displayDate() {
    if (this.state.clearance_date === null) {
      return 'pending'
    } else {
      return this.state.clearance_date
    }
  }

  render({ id, description, amount } = this.state) {
    return (
      <div className="transaction">
        <div className="clearance-date">
          {this.displayDate()}
        </div>
        <div className="description">
          {description}
        </div>
        <div className="amount">
          {(amount === null) ? '' : '$' + parseFloat(amount / 100.0).toFixed(2)}
        </div>
        <div className="balance">
          ${parseFloat(this.state.balance / 100.0).toFixed(2)}
        </div>
        <div className="budget-categories">
          {this.state.budget_category}
        </div>
        <span className="exclusion">
          {this.state.budget_exclusion ? 'budget exclusion' : ''}
        </span>
        <div className="notes">
          {this.state.notes}
        </div>
      </div>
    )
  }
}

export default Transaction
