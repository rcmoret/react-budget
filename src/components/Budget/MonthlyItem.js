import React, { Component } from 'react'
import Icon from '../Icons/Icon'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props }
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
          {MoneyFormatter(this.state.amount, { absolute: true })}
        </div>
      </div>
    );
  }
}

export default MonthlyItem;
