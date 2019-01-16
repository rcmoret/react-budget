import React, { Component } from 'react'
import Amount from './Amount'
import Icon from '../../Icons/Icon'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.updateParent = this.updateParent.bind(this)
  }

  updateParent(newState) {
    this.setState(newState)
  }

  render() {
    return (
      <div className='budget-item'>
        <div className="budget-item-detail">
          <div className='budget-item-description'>
            <div className="caret">
              <Icon className="fas fa-caret-right" />
            </div>
            {this.state.name}
            &nbsp;
            <Icon className={this.state.icon_class_name} />
          </div>
          <div className='budget-item-amount'>
            <Amount
             updateParent={this.updateParent}
             absolute={true}
             {...this.state}
             remaining={this.state.amount}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MonthlyItem;
