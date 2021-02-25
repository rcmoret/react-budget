import React from "react"
import { connect } from "react-redux"

import { transaction as copy } from "../../../locales/copy"
import { edit, deleteTransaction, toggleEditForm } from "../../../actions/transactions"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { deleteRequest } from "../../../functions/ApiClient"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"

import Amount from "./Amount"
import Balance from "./Balance"
import BottomRow from "./BottomRow"
import BudgetCategories from "./BudgetCategories"
import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Description from "./Description"
import Edit from "../Edit"
import EndLinks from "./EndLinks"
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
      const url = ApiUrlBuilder({ route: "transaction-show", id: id, accountId: account_id })
      const action = deleteTransaction({ id: id, amount: (-1 * amount), account_id: account_id })
      const event = EventMessageBuilder({
        eventType: "transaction-entry-delete",
        id: id,
        details: details
      })
      deleteRequest(url, event, () => props.dispatch(action))
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
              <div className="left-caret">
                <LeftIcon
                  collapseDetail={collapseDetail}
                  details={details}
                  expandDetail={expandDetail}
                  showDetail={showDetail}
                />
              </div>
              <ClearanceDate clearanceDate={clearance_date} />
              <Description
                collapseDetail={collapseDetail}
                description={description}
                details={details}
                expandDetail={expandDetail}
                showDetail={showDetail}
              />
            </div>
            <div className="middle-content">
              <Amount amount={amount} details={details} showDetail={showDetail} />
              <Balance balance={balance} />
              <BudgetCategories
                description={description}
                details={details}
                showDetail={showDetail}
              />
              <BudgetExclusion budgetExclusion={budget_exclusion} />
              <Notes notes={notes} />
              <CheckNumber checkNumber={check_number} />
            </div>
          </div>
          <EndLinks revealForm={revealForm} transactionDelete={transactionDelete} />
          <BottomRow
            id={id}
            balance={balance}
            budgetExclusion={budget_exclusion}
            check_number={check_number}
            description={description}
            details={details}
            notes={notes}
            showDetail={showDetail}
          />
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Show)
