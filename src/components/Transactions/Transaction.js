import React, { Component } from "react";
import Amount from "./Amount"
import Balance from "./Balance"
import BudgetCategories from "./BudgetCategories"
import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Description from "./Description"
import Notes from "./Notes"
import LeftIcon from "./LeftIcon"
import Subtransactions from "./Subtransactions"

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
    this.expandDetail = this.expandDetail.bind(this)
    this.collapseDetail = this.collapseDetail.bind(this)
  }

  componentWillReceiveProps(nextProps) {
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

  render() {
    const { amount, balance, budget_category, budget_exclusion, check_number, clearance_date,
            description, icon_class_name, notes, showDetail, subtransactions } = this.state
    return(
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="left-icon">
            <LeftIcon
              showDetail={showDetail}
              subtransactions={subtransactions}
              expandDetail={this.expandDetail}
              collapseDetail={this.collapseDetail}
            />
          </div>
          <ClearanceDate clearanceDate={clearance_date} />
          <Description
            budgetCategory={budget_category}
            iconClassName={icon_class_name}
            description={description}
          />
          <Amount amount={amount} />
          <Balance balance={balance} />
          <CheckNumber checkNumber={check_number} />
          <BudgetCategories {...this.state} />
          <BudgetExclusion budgetExclusion={budget_exclusion} />
          <Notes notes={notes} />
        </div>
        <Subtransactions showDetail={showDetail} subtransactions={subtransactions} />
      </div>
    )
  }
}

Transaction.defaultProps = {
  subtransactions: [],
}

export default Transaction
