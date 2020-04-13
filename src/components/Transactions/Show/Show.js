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
import Icon from "../../Icons/Icon"
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
          <div className="amount">
            <Amount
              amount={amount}
              details={details}
              showDetail={showDetail}
            />
          </div>
          <Balance balance={balance} />
          <div className="transaction-info">
            <BudgetCategories showDetail={showDetail} {...props} />
            <CheckNumber checkNumber={check_number} />
            <BudgetExclusion budgetExclusion={budget_exclusion} />
            <Notes notes={notes} />
            <BudgetCategoryDetails showDetail={showDetail} {...props} />
          </div>
        </div>
        <div className="transaction-links">
          <EditLink transactionId={id} editable={props.deletable} />
          {" "}
          <DeleteButton onClick={transactionDelete} deletable={props.deletable} />
        </div>
      </div>
    )
  }
}

const BudgetCategoryDetails = ({ details, showDetail }) => {
  if (showDetail) {
    return (
      <div className="transaction-info-line">
        {details.map(detail => (
          <Detail key={detail.id} {...detail} />
        ))}
      </div>
    )
  } else {
    return null
  }
}

const Detail = ({ budget_category, icon_class_name }) => (
  <div className="detail-show">
    <Icon className={icon_class_name} /> {budget_category}
  </div>
)

export default connect((_state, ownProps) => ownProps)(Show)
