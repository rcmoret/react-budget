import React from "react"

import Select from "react-select"

export default (props) => {
  const {
    _id,
    amount,
    budget_category,
    budget_item_id,
    options,
    onSubChange,
  } = props

  const onChange = (e) => {
    if (amount === "" && e.monthly) {
      onSubChange(_id, { amount: e.amount, budget_item_id: e.value })
    } else {
      onSubChange(_id, { budget_item_id: e.value })
    }
  }
  const value = options.find(option => option.value === budget_item_id)
  const fallbackValue = { label: budget_category, value: budget_item_id }
  const selectedValue = value || fallbackValue

  return (
    <div className="subtransaction-budget-item-select">
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
