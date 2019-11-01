import React from "react"

import Select from "react-select"

export default (props) => {
  const {
    _id,
    amount,
    budgetCategory,
    budgetItemId,
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
  const value = options.find(option => option.value === budgetItemId)
  const fallbackValue = { label: budgetCategory, value: budgetItemId }
  const selectedValue = value || fallbackValue

  return (
    <div className="detail-budget-item-select">
      <Select
        options={options}
        value={selectedValue}
        onChange={onChange}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
      />
    </div>
  )
}
