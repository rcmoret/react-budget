import React from "react"

import { Link } from "react-router-dom"

export default (props) => (
  <div className="option-icons">
    <NoteIcon {...props} />
    <CheckIcon {...props} />
    <BudgetExclusionIcon {...props } />
    <ReceiptIcon { ...props } />
  </div>
)

const BudgetExclusionIcon = ({ budgetExclusion, formOptions, selectedAccount, toggleFormOption }) => (
  <OptionIcon
    highlighted={budgetExclusion}
    iconClassName="fas fa-exclamation"
    name="showBudgetExclusion"
    onClick={toggleFormOption}
    showOption={!(formOptions.showBudgetExclusion || selectedAccount.cash_flow)}
    toggleFormOption={toggleFormOption}
  />
)

const CheckIcon = ({ checkNumber, formOptions, toggleFormOption }) => (
  <OptionIcon
    highlighted={!(checkNumber === null || checkNumber === "")}
    iconClassName="fas fa-money-check"
    name="showCheck"
    onClick={toggleFormOption}
    showOption={!formOptions.showCheck}
    toggleFormOption={toggleFormOption}
  />
)

const NoteIcon = ({ formOptions, notes, toggleFormOption }) => (
  <OptionIcon
    highlighted={!(notes === null || notes === "")}
    iconClassName="fas fa-sticky-note"
    name="showNotes"
    onClick={toggleFormOption}
    showOption={!formOptions.showNotes}
    toggleFormOption={toggleFormOption}
  />
)


const ReceiptIcon = ({ formOptions, toggleFormOption })=> {
  if (formOptions.showReceipt) {
    return null
  } else {
    return (
      <div className="option-icon">
        <Link to="#" onClick={toggleFormOption} name="showReceipt" className="fas fa-paperclip" />
      </div>
    )
  }
}

const OptionIcon = ({ highlighted, iconClassName, name, showOption, toggleFormOption }) => {
  if (!showOption) {
    return null
  } else if (highlighted) {
    return (
      <div className="option-icon">
        <span className="highlighted">
          <Link to="#" onClick={toggleFormOption} name={name} className={iconClassName} />
        </span>
      </div>
    )
  } else {
    return (
      <div className="option-icon">
        <Link to="#" onClick={toggleFormOption} name={name} className={iconClassName} />
      </div>
    )
  }
}
