import React from "react"

import AddDetailLink from "./AddDetailLink"
import BudgetExclusion from "./BudgetExclusion"
import CheckNumber from "./CheckNumber"
import ClearanceDate from "./ClearanceDate"
import Descriptions from "./Descriptions"
import DetailAmount from "./DetailAmount"
import DetailBudgetItemSelect from "./DetailBudgetItemSelect"
import { Link } from "react-router-dom"
import Notes from "./Notes"
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
            details={details}
            detailCount={details.length}
            handleKeyDown={handleKeyDown}
            onDetailChange={onDetailChange}
            options={budgetOptions}
          />
        </div>
        <div className="transaction-row options">
          <Notes
            handleKeyDown={handleKeyDown}
            onChange={onChange}
            notes={notes}
          />
          <CheckNumber
            onChange={onChange}
            check_number={check_number || ""}
          />
          <BudgetExclusion
            onChange={onChange}
            budget_exclusion={budget_exclusion}
            selectedAccount={selectedAccount}
          />
          <Receipt
            onChange={onChange}
          />
          <SubmitButton
            buttonText={buttonText}
            onSubmit={onSubmit}
          />
          <AddDetailLink
            addDetail={addDetail}
          />
        </div>
      </div>
    </div>
  )
}

const Receipt = ({ onChange }) => {
  const handleImageChange = event => {
    const file = event.target.files[0]
    onChange({ receipt: file })
  }

  return (
    <div>
      <input type="file" name="receipt" onChange={handleImageChange} />
    </div>
  )
}

const Details = (props) => {
  const {
    details,
    detailCount,
    handleKeyDown,
    onDetailChange,
    options,
  } = props

  const total = details.reduce((acc, detail) => acc + (parseFloat(detail.amount || 0)), 0)
  const nullFn = () => null
  const initialDetail = { id: 0, amount: MoneyFormatter(total * 100), disabled: true, handleKeyDown: nullFn, onDetailChange: nullFn, budgetItemId: null }

  const detailCollection = (detailCount === 1) ? details : [initialDetail, ...details]
  const indexFor = index => (detailCount === 1) ? 0 : index - 1

  return (
    detailCollection.map((detail, index) => {
      return (
        <div className="transaction-row" key={index}>
          <DetailAmount
            index={indexFor(index)}
            detail={detail}
            onDetailChange={onDetailChange}
            onKeyDown={handleKeyDown}
          />
          <div className="budget-item-select">
            <DetailBudgetItemSelect
              index={indexFor(index)}
              detail={detail}
              onDetailChange={onDetailChange}
              options={options}
            />
          </div>
        </div>
      )
    })
  )
}
