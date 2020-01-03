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
import Details from "./Details"
import Edit from "../Edit"
import EditLink from "./EditLink"
import Notes from "./Notes"
import LeftIcon from "./LeftIcon"

const Show = (props) => {
  const {
    id,
    account_id,
    amount,
    balance,
    budget_exclusion,
    check_number,
    clearance_date,
    description,
    details,
    notes,
    showDetail,
    showForm,
  } = props

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
              details={details}
              expandDetail={expandDetail}
              collapseDetail={collapseDetail}
            />
          </div>
          <ClearanceDate clearanceDate={clearance_date} />
          <Description
            description={description}
            details={details}
          />
          <Amount amount={amount} />
          <Balance balance={balance} />
          <BudgetCategories showDetail={showDetail} {...props} />
          <CheckNumber checkNumber={check_number} />
          <BudgetExclusion budgetExclusion={budget_exclusion} />
          <Notes notes={notes} />
        </div>
        <EditLink transactionId={id} editable={props.deletable} />
        {" "}
        <DeleteButton onClick={transactionDelete} deletable={props.deletable} />
        <Details showDetail={showDetail} details={details} />
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
