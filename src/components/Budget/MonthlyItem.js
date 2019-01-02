import React, { Component } from 'react'
import Icon from '../Icons/Icon'

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
    this.formattedAmount = this.formattedAmount.bind(this)
  }

  formattedAmount() {
    const amt = Math.abs(this.state.amount / 100.0)
    return "$" + parseFloat(amt).toFixed(2)
  }

  render() {
    return (
      <div className='budget-item'>
        <div className='budget-item-description'>
          <Icon className="fas fa-caret-right" />
          &nbsp;
          <Icon className={this.state.icon_class_name} />
          &nbsp;
          {this.state.name}
        </div>
        <div className='budget-item-amount'>
          {this.formattedAmount()}
        </div>
      </div>
    );
  }
}

export default MonthlyItem;
