import React, { Component } from 'react'
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'
import Caret from './Caret'
import Icon from '../Icons/Icon'
import DiscretionaryDetail from './DiscretionaryDetail'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const Amount = (props) => {
  if (props.showDetail) {
    return (
      <span>
        {MoneyFormatter(props.amount)}
      </span>
    )
  } else {
    return (
      <span>
        {MoneyFormatter(props.remaining)}
      </span>
    )
  }
}

class Discretionary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'spending cache',
      remaining: 0,
      showDetail: false,
    }
    this.expandDetail = this.expandDetail.bind(this)
    this.collapseDetail = this.collapseDetail.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder('budget', 'discretionary'))
      .then(response => response.json())
      .then(data => this.setState({
        ...data
        })
     )
  }

  expandDetail(ev) {
    this.setState({ showDetail: true })
  }

  collapseDetail(ev) {
    this.setState({ showDetail: false })
  }

  render() {
    return (
      <div className='budget-item'>
        <div className='budget-item-description'>
          <div className="caret">
            <Caret
              {...this.state}
              expandDetail={this.expandDetail}
              collapseDetail={this.collapseDetail}
            />
          </div>
          {this.state.name}
          &nbsp;
          <Icon className='fa fa-money-bill-alt' />
        </div>
        <div className='budget-item-amount'>
          <Amount {...this.state} />
        </div>
        <DiscretionaryDetail {...this.state} />
      </div>
    )
  }
}

export default Discretionary;
