import React, { Component } from 'react'
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'
/* import MoneyFormatter from '../../shared/Functions/MoneyFormatter' */
import SpentOrDeposited from './SpentOrDeposited'

class WeeklyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      showDetail: false,
      ...props
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.showDetail) {
      fetch(ApiUrlBuilder('budget', 'categories', this.state.category_id, 'items', this.state.id, 'transactions'))
        .then(response => response.json())
        .then(data => this.setState({ transactions: data, ...nextProps }))
   } else {
      this.setState(nextProps)
    }
  }

  render() {
    if (this.state.showDetail) {
      return (
        <div>
          <SpentOrDeposited {...this.state} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default WeeklyDetail;
