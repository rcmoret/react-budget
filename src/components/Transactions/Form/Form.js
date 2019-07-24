import React from "react"

import AddSubtransactionLink from "./AddSubtransactionLink"
import Amounts from "./Amount"
import BudgetExclusion from "./BudgetExclusion"
import BudgetItemSelect from "./BudgetItemSelect"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Descriptions from "./Descriptions"
import { Link } from "react-router-dom"
import Notes from "./Notes"
import SubmitButton from "./Submit"

export default (props) => {
  const {
    addSubtransaction,
    budgetOptions,
    buttonText,
    handleKeyDown,
    onChange,
    onSubChange,
    onSubmit,
    resetForm,
    selectedAccount,
    transaction
  } = props

  const {
    amount,
    budget_exclusion,
    budget_item_id,
    check_number,
    clearance_date,
    description,
    notes,
    subtransactions
  } = transaction

  return (
    <div className="transaction-form transaction-wrapper">
      <div className="top-line">
        <div className="close-icon">
          <Link
            to="#"
            onClick={resetForm}
            className="fas fa-times"
          />
        </div>
        <ClearanceDate
          clearanceDate={clearance_date}
          onChange={onChange}
          handleKeyDown={handleKeyDown}
        />
        <Descriptions
          description={description}
          handleKeyDown={handleKeyDown}
          onChange={onChange}
          onSubChange={onSubChange}
          subtransactions={subtransactions}
        />
        <Amounts
          amount={amount}
          handleKeyDown={handleKeyDown}
          onChange={onChange}
          onSubChange={onSubChange}
          subtransactions={subtransactions}
        />
        <BudgetItemSelect
          amount={amount}
          budget_item_id={budget_item_id}
          onChange={onChange}
          onSubChange={onSubChange}
          options={budgetOptions}
          subtransactions={subtransactions}
        />
        <div className="additional-options">
          <Notes
            handleKeyDown={handleKeyDown}
            onChange={onChange}
            notes={notes}
          />
          <CheckNumber
            onChange={onChange}
            check_number={check_number || ""}
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
      <AddSubtransactionLink
        subtransactions={subtransactions}
        addSubtransaction={addSubtransaction}
      />
    </div>
  )
}
