import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { edit, deleteTransaction } from "../../../actions/transactions"

import Amount from "./Amount"
import Balance from "./Balance"
import BudgetCategories from "./BudgetCategories"
import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import DeleteButton from "./DeleteButton"
import Description from "./Description"
import Notes from "./Notes"
import LeftIcon from "./LeftIcon"
import Subtransactions from "./Subtransactions"

const Show = (props) => {
  const { account_id, amount, balance, budget_category, budget_exclusion, check_number, clearance_date,
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

  const transactionDelete = (e) => {
    e.preventDefault()
    const confirmation = window.confirm("Are you sure you want to delete this transaction?")
    if (!confirmation) {
      return
    } else {
      const url = ApiUrlBuilder(["accounts", account_id, "transactions", id])
      const action = deleteTransaction({ id: id, amount: (-1 * amount), account_id: account_id })
      fetch(url, { method: "delete" })
        .then(() => props.dispatch(action))
    }
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
      <DeleteButton onClick={transactionDelete} deletable={props.deletable} />
      <Subtransactions showDetail={showDetail} subtransactions={subtransactions} />
    </div>
  )
}

export default connect((_state, ownProps) => ownProps)(Show)
