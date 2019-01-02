import React, { Component } from 'react'
import Icon from '../Icon'

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
  }

  render() {
    return (
      <div className='budget-item'>
        <div className='budget-item-description'>
          <Icon className={this.state.icon_class_name} />
          &nbsp;
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
