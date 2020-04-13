import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"

import { BudgetCategoryIcons, CheckIcon, NotesIcon } from "./Icons"
import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    id,
    balance,
    budgetExclusion,
    check_number,
    details,
    notes,
    showDetail,
  } = props

  if (id === 0) {
    return null
  } else {
    return (
      <div className="transaction-row">
        <TransactionInfo
          budgetExclusion={budgetExclusion}
          check_number={check_number}
          details={details}
          notes={notes}
          showDetail={showDetail}
        />
        <TransactionBalance
          balance={balance}
        />
      </div>
    )
  }
}

const TransactionInfo = (props) => {
  const {
    budgetExclusion,
    check_number,
    details,
    notes,
  } = props

  return (
    <div className="txn-info">
      <BudgetCategoryIcons details={details} />
      <NotesIcon notes={notes} />
      <CheckIcon checkNumber={check_number} />
      <BudgetExclusion exclusion={budgetExclusion} />
    </div>
  )
}

const BudgetExclusion = ({ exclusion }) => {
  if (!exclusion) {
    return null
  } else {
    return (
      <div className="info-item budget-exclusion">
        budget exclusion
      </div>
    )
  }
}

const TransactionBalance = ({ balance }) => (
  <div className="txn-balance">
    {MoneyFormatter(balance)}
  </div>
)
