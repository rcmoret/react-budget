import React, { Component } from 'react';
import Subtransaction from './Subtransaction'
import LeftIcon from './LeftIcon'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
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

  render({ description, amount, subtransactions } = this.state) {
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
            {(amount === null) ? '' : '$' + parseFloat(amount / 100.0).toFixed(2)}
          </div>
          <div className="balance">
            ${parseFloat(this.state.balance / 100.0).toFixed(2)}
          </div>
          <div className="budget-categories">
            {this.state.budget_category}
          </div>
          <span className="exclusion">
            {this.state.budget_exclusion ? 'budget exclusion' : ''}
          </span>
          <div className="notes">
            {this.state.notes}
          </div>
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
