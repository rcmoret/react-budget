import React from "react"
import { connect } from "react-redux"

import { transaction as copy } from "../../../locales/copy"
import { edit, deleteTransaction, toggleEditForm } from "../../../actions/transactions"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"

import Icon from "../../Icons/Icon"
import Amount from "./Amount"
import Balance from "./Balance"
import BottomRow from "./BottomRow"
import BudgetCategories from "./BudgetCategories"
import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Description from "./Description"
import Edit from "../Edit"
import Notes from "./Notes"
import LeftIcon from "./LeftIcon"
import TxnLinks from "./TxnLinks"

const Show = (props) => {
  const {
    id,
    account_id,
    amount,
    balance,
    budget_exclusion,
    check_number,
    clearance_date,
    deletable,
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

  const revealForm = (e) => {
    e.preventDefault()
    const action = toggleEditForm({ id: id })
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
          <div className="transaction-row">
            <div className="left-content">
              <ClearanceDate clearanceDate={clearance_date} />
              <Description
                collapseDetail={collapseDetail}
                description={description}
                details={details}
                expandDetail={expandDetail}
                showDetail={showDetail}
              />
            </div>
            <Amount amount={amount} />
          </div>
          <BottomRow
            id={id}
            balance={balance}
            budgetExclusion={budget_exclusion}
            check_number={check_number}
            details={details}
            notes={notes}
            showDetail={showDetail}
          />
          <TxnLinks
            id={id}
            deletable={deletable}
            revealForm={revealForm}
            showDetail={showDetail}
            transactionDelete={transactionDelete}
          />
        </div>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
