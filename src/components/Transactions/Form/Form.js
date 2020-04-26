import React from "react"

import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Descriptions from "./Descriptions"
import DetailAmount from "./DetailAmount"
import Details from "./Details"
import DetailBudgetItemSelect from "./DetailBudgetItemSelect"
import { Link } from "react-router-dom"
import Notes from "./Notes"
import OptionIcons from "./OptionIcons"
import Receipt from "./Receipt"
import SubmitButton from "./Submit"

import MoneyFormatter from "../../../functions/MoneyFormatter"

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
    toggleFormOption,
    transaction
  } = props

  const {
    budget_exclusion,
    check_number,
    clearance_date,
    description,
    details,
    notes,
  } = transaction

  return (
    <div className="transaction-form transaction-wrapper">
      <div className="transaction">
        <div className="transaction-row left-content">
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
        </div>
        <div className="transaction-row middle-content">
          <Descriptions
            description={description}
            handleKeyDown={handleKeyDown}
            onChange={onChange}
            details={details}
          />
        </div>
        <div className="detail-wrapper">
          <Details
            addDetail={addDetail}
            details={details}
            detailCount={details.length}
            handleKeyDown={handleKeyDown}
            onDetailChange={onDetailChange}
            options={budgetOptions}
          />
        </div>
        <div className="transaction-row options">
          <OptionIcons
            budgetExclusion={budget_exclusion}
            checkNumber={check_number}
            formOptions={transaction.formOptions}
            notes={notes}
            selectedAccount={selectedAccount}
            toggleFormOption={toggleFormOption}
          />
          <div className="input-options">
            <Notes
              formOptions={transaction.formOptions}
              handleKeyDown={handleKeyDown}
              onChange={onChange}
              notes={notes}
              toggleFormOption={toggleFormOption}
            />
            <CheckNumber
              formOptions={transaction.formOptions}
              onChange={onChange}
              check_number={check_number || ""}
              toggleFormOption={toggleFormOption}
            />
            <BudgetExclusion
              budget_exclusion={budget_exclusion}
              formOptions={transaction.formOptions}
              onChange={onChange}
              selectedAccount={selectedAccount}
              toggleFormOption={toggleFormOption}
            />
            <Receipt
              formOptions={transaction.formOptions}
              onChange={onChange}
              toggleFormOption={toggleFormOption}
            />
          </div>
        </div>
        <SubmitButton
          buttonText={buttonText}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}
