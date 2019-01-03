import React, { Component } from 'react';
import BudgetCategories from './BudgetCategories'
import Subtransaction from './Subtransaction'
import LeftIcon from './LeftIcon'
import Icon from '../Icons/Icon'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtransactions: [],
      ...props,
    }
    this.expandDetail = this.expandDetail.bind(this)
    this.collapseDetail = this.collapseDetail.bind(this)
    this.displayDate = this.displayDate.bind(this)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  displayDate() {
    if (this.state.clearance_date === null) {
      return 'pending'
    } else {
      return this.state.clearance_date
    }
  }

  expandDetail(ev) {
    ev.preventDefault()
    this.setState({ showDetail: true })
  }

  collapseDetail(ev) {
    ev.preventDefault()
    this.setState({ showDetail: false })
  }

  render({ amount, description, subtransactions } = this.state) {
    return(
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="left-icon">
            <LeftIcon expandDetail={this.expandDetail} collapseDetail={this.collapseDetail} {...this.state} />
          </div>
          <div className="clearance-date">
            {this.displayDate()}
          </div>
          <div className="description">
            {description}
          </div>
          <div className="amount">
            {MoneyFormatter(amount)}
          </div>
          <div className="balance">
            {MoneyFormatter(this.state.balance)}
          </div>
          {this.state.check_number ?
            <div className="check-number">
              <Icon className="fas fa-money-check" />&nbsp;
              Check: {this.state.check_number}
            </div>
            :
          ''
          }
          <BudgetCategories {...this.state} />
          {this.state.budget_exclusion ?
            <div className="exclusion">
              {this.state.budget_exclusion ? 'budget exclusion' : ''}
            </div>
            :
          ''
          }
          {this.state.notes ?
            <div className="notes">
              <Icon className="fas fa-scroll" />&nbsp;
              {this.state.notes}
            </div>
            :
          ''
          }
        </div>
        {
          subtransactions.length > 0 ?
          subtransactions.map((sub) => <Subtransaction key={sub.id}  showDetail={this.state.showDetail} {...sub} />) :
          ''
        }
      </div>
    )
  }
}

export default Transaction
