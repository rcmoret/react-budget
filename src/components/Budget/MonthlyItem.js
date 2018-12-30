import React, { Component } from 'react'

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  render() {
    return(
      <div>
        <strong>{this.state.name}</strong>
        <p>${parseFloat(this.state.amount / 100.0).toFixed(2)}</p>
      </div>
    );
  }
}

export default MonthlyItem;
