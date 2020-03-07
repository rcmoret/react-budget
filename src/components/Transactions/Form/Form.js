import React from "react"

import AddDetailLink from "./AddDetailLink"
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
    addDetail,
    budgetOptions,
    buttonText,
    handleKeyDown,
    onChange,
    onDetailChange,
    onSubmit,
    resetForm,
    selectedAccount,
    transaction
  } = props

  const {
    amount,
    budget_exclusion,
    check_number,
    clearance_date,
    description,
    details,
    notes,
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
          details={details}
        />
        <Amounts
          amount={amount}
          handleKeyDown={handleKeyDown}
          onChange={onChange}
          onDetailChange={onDetailChange}
          details={details}
        />
        <BudgetItemSelect
          details={details}
          onChange={onChange}
          budget_exclusion={budget_exclusion}
          onDetailChange={onDetailChange}
          options={budgetOptions}
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
      <AddDetailLink
        addDetail={addDetail}
      />
    </div>
  )
}
