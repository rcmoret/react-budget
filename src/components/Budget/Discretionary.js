import React, { Component } from 'react'
import Icon from '../Icons/Icon'
import API_URL from '../../shared/Constants/Api'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

class Discretionary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'spending cache',
      remaining: 0,
    }
  }

  componentWillMount() {
    fetch(API_URL + '/budget/discretionary')
      .then(response => response.json())
      .then(data => this.setState({
        ...data
        })
     )
  }

  render() {
    return (
      <div className='budget-item'>
        <div className='budget-item-description'>
          <Icon className="fas fa-caret-right" />
          &nbsp;
          {this.state.name}
        </div>
        <div className='budget-item-amount'>
          {MoneyFormatter(this.state.remaining)}
        </div>
      </div>
    )
  }
}

export default Discretionary;
