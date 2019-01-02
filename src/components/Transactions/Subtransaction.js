import React, { Component } from 'react';

class Subtransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.showDetail) {
      return (
        <div className="transaction subtransaction">
          <div className="left-icon">
          </div>
          <div className="clearance-date">
          </div>
          <div className="description">
            {this.state.description}
          </div>
          <div className="amount">
            ${parseFloat(this.state.amount / 100.0).toFixed(2)}
          </div>
          <div className="balance">
          </div>
          <div className="budget-categories">
            {this.state.budget_category}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Subtransaction;
