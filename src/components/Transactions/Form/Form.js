import React from "react"

import { Link } from "react-router-dom"

import AddSubtransactionLink from "./AddSubtransactionLink"
import Amounts from "./Amount"
import BudgetExclusion from "./BudgetExclusion"
import BudgetItemSelect from "./BudgetItemSelect"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Descriptions from "./Descriptions"
import Notes from "./Notes"
import SubmitButton from "./Submit"

const Form = (props) => {
  const { addSubtransaction, buttonText, onChange, onSubChange, onSubmit, resetForm, selectedAccount, transaction } = props
  const { amount, budget_exclusion, budget_item_id, check_number, clearance_date,
    description, notes, subtransactions } = transaction

  return (
    <div className="transaction-form transaction-wrapper">
      <div className="left-stuff">
        <div>
          <Link
            to="#"
            onClick={resetForm}
            className="fas fa-times"
          />
          <ClearanceDate
            clearanceDate={clearance_date}
            onChange={onChange}
          />
        </div>
        <AddSubtransactionLink
          subtransactions={subtransactions}
          addSubtransaction={addSubtransaction}
        />
      </div>
      <Descriptions
        description={description}
        onChange={onChange}
        onSubChange={onSubChange}
        subtransactions={subtransactions}
      />
      <Amounts
        amount={amount}
        onChange={onChange}
        onSubChange={onSubChange}
        subtransactions={subtransactions}
      />
      <BudgetItemSelect
        budget_item_id={budget_item_id}
        onChange={onChange}
        onSubChange={onSubChange}
        subtransactions={subtransactions}
      />
      <div className="additional-options">
        <Notes
          onChange={onChange}
          notes={notes}
        />
        <CheckNumber
          onChange={onChange}
          check_number={check_number}
        />
      </div>
      <BudgetExclusion
        onChange={onChange}
        budget_exclusion={budget_exclusion}
        selectedAccount={selectedAccount}
      />
      <SubmitButton
        buttonText={buttonText}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Form
