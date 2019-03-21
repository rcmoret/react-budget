import React from "react";
import { connect } from "react-redux"

import { edit } from "../../../actions/transactions"

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

const Show = (props) => {
  const { amount, balance, budget_category, budget_exclusion, check_number, clearance_date,
          description, icon_class_name, id, notes, showDetail, subtransactions } = props

  const expandDetail = (e) => {
    e.preventDefault()
    const action = edit({ id: id, showDetail: true })
    props.dispatch(action)
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    const action = edit({ id: id, showDetail: false })
    props.dispatch(action)
  }

  return(
    <div className="transaction-wrapper">
      <div className="transaction">
        <div className="left-icon">
          <LeftIcon
            showDetail={showDetail}
            subtransactions={subtransactions}
            expandDetail={expandDetail}
            collapseDetail={collapseDetail}
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
        <BudgetCategories {...props} />
        <BudgetExclusion budgetExclusion={budget_exclusion} />
        <Notes notes={notes} />
      </div>
      <Subtransactions showDetail={showDetail} subtransactions={subtransactions} />
    </div>
  )
}

export default connect((_state, ownProps) => ownProps)(Show)
