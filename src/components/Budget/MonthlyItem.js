import React, { Component } from 'react'

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  render() {
    return (
      <div className='budget-item'>
        <div className='budget-item-description'>
          {this.state.name}
        </div>
        <div className='budget-item-amount'>
          ${parseFloat(this.state.amount / 100.0).toFixed(2)}
        </div>
      </div>
    );
  }
}

export default MonthlyItem;
