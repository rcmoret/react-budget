import React from "react"
import { connect } from "react-redux"

import { transaction as copy } from "../../../locales/copy"
import { edit, deleteTransaction } from "../../../actions/transactions"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"

import Amount from "./Amount"
import Balance from "./Balance"
import BudgetCategories from "./BudgetCategories"
import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import DeleteButton from "./DeleteButton"
import Description from "./Description"
import Edit from "../Edit"
import EditLink from "./EditLink"
import Notes from "./Notes"
import LeftIcon from "./LeftIcon"
import Subtransactions from "./Subtransactions"

const Show = (props) => {
  const { account_id, amount, balance, budget_category, budget_exclusion, check_number, clearance_date,
    description, icon_class_name, id, notes, showDetail, showForm, subtransactions } = props

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
    const confirmation = window.confirm(copy.deleteConfirmationMessage)
    if (!confirmation) {
      return
    } else {
      const url = ApiUrlBuilder(["accounts", account_id, "transactions", id])
      const action = deleteTransaction({ id: id, amount: (-1 * amount), account_id: account_id })
      fetch(url, { method: "delete" })
        .then(() => props.dispatch(action))
    }
  }

  if (showForm) {
    return (
      <Edit { ...props } />
    )
  } else {
    return (
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
          <BudgetCategories {...props} />
          <CheckNumber checkNumber={check_number} />
          <BudgetExclusion budgetExclusion={budget_exclusion} />
          <Notes notes={notes} />
        </div>
        <EditLink transactionId={id} editable={props.deletable} />
        {" "}
        <DeleteButton onClick={transactionDelete} deletable={props.deletable} />
        <Subtransactions showDetail={showDetail} subtransactions={subtransactions} />
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
