import React from "react"

import Select from "react-select"

import { transaction as copy } from "../../../locales/copy"

export default (props) => {
  const {
    _id,
    amount,
    budget_category,
    budget_exclusion,
    budget_item_id,
    onDetailChange,
    options,
  } = props

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
    <div className="detail-budget-item-select">
      <Select
        isDisabled={budget_exclusion}
        options={options}
        value={selectValue()}
        onChange={onChange}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
      />
    </div>
  )
}
