import React, { Component } from 'react';

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render({ id, description, amount } = this.props) {
    return (
      <div className="transaction">
        <p>{description} ${parseFloat(amount / 100.0).toFixed(2)}</p>
      </div>
    )
  }
}

export default Transaction
