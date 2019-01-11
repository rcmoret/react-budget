import React, { Component } from 'react';
import BudgetCategories from './BudgetCategories'
import Subtransaction from './Subtransaction'
import LeftIcon from './LeftIcon'
import Icon from '../Icons/Icon'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const Description = (props) => {
  if (props.description === null) {
    return (
      <div className="description">
        {props.budget_category}&nbsp;
        <Icon className={props.icon_class_name} />
      </div>
    )
  } else {
    return (
      <div className="description">
        {props.description}
      </div>
    )
  }
}

const ClearanceDate = (props) => {
  const displayDate = props.clearance_date === null ? 'pending' : props.clearance_date

  return (
    <div className="clearance-date">
      {displayDate}
    </div>
  )
}

const CheckNumber = (props) => {
  if (props.check_number) {
    return (
      <div className="check-number">
        <Icon className="fas fa-money-check" />&nbsp;
        Check: {props.check_number}
      </div>
    )
  } else {
    return null
  }
}

const BudgetExclusion = (props) => {
  if (props.budget_exclusion) {
    return (
      <div className="exclusion">
        {props.budget_exclusion ? 'budget exclusion' : ''}
      </div>
    )
  } else {
    return null
  }
}

const Notes = (props) => {
  if (props.notes) {
    return(
      <div className="notes">
        <Icon className="fas fa-sticky-note" />&nbsp;
        {props.notes}
      </div>
    )
  } else {
    return null
  }
}

const Subtransactions = (props) => {
    return (
      props.subtransactions.map((sub) => {
        return <Subtransaction key={sub.id}  showDetail={props.showDetail} {...sub} />
      })
    )
}

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtransactions: [],
      ...props,
    }
    this.expandDetail = this.expandDetail.bind(this)
    this.collapseDetail = this.collapseDetail.bind(this)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  expandDetail(ev) {
    ev.preventDefault()
    this.setState({ showDetail: true })
  }

  collapseDetail(ev) {
    ev.preventDefault()
    this.setState({ showDetail: false })
  }

  render({ amount, subtransactions } = this.state) {
    return(
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="left-icon">
            <LeftIcon
             expandDetail={this.expandDetail}
             collapseDetail={this.collapseDetail}
             {...this.state}
            />
          </div>
          <ClearanceDate {...this.state} />
          <Description {...this.state} />
          <div className="amount">
            {MoneyFormatter(amount)}
          </div>
          <div className="balance">
            {MoneyFormatter(this.state.balance)}
          </div>
          <CheckNumber {...this.state} />
          <BudgetCategories {...this.state} />
          <BudgetExclusion {...this.state} />
          <Notes {...this.state} />
        </div>
        <Subtransactions {...this.state} />
      </div>
    )
  }
}

export default Transaction
