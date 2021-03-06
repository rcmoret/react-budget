import React from "react"

import Select from "react-select"

import { transaction as copy } from "../../../locales/copy"

export default (props) => {
  const {
    index,
    detail,
    budget_exclusion,
    onDetailChange,
    options,
  } = props

  const {
    id,
    amount,
    budget_category,
    budget_item_id,
    disabled,
  } = detail

  const _id = id || index

  const onChange = (e) => {
    if (amount === "" && e.monthly) {
      onDetailChange(_id, { amount: e.amount, budget_item_id: e.value })
    } else {
      onDetailChange(_id, { budget_item_id: e.value })
    }
  }
  const value = options.find(option => option.value === budget_item_id)
  const fallbackValue = { label: budget_category, value: budget_item_id }
  const selectValue = () => {
    if (budget_exclusion) {
      return { label: copy.budgetExclusion, value: "" }
    } else {
      return value || fallbackValue
    }
  }

  return (
    <div className={`detail-budget-item-select ${disabled ? "disabled" : ""}`}>
      <Select
        isDisabled={disabled || budget_exclusion}
        options={options}
        value={selectValue()}
        onChange={onChange}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
      />
    </div>
  )
}
