import React from "react"

import Select from "react-select"

export default ({ _id, budget_item_id, options, onSubChange }) => {
  const onChange = (e) => {
    onSubChange(_id, { budget_item_id: e.value })
  }
  const value = options.find(option => option.value === budget_item_id)

  return (
    <div className="subtransaction-budget-item-select">
      <Select
        options={options}
        value={value}
        onChange={onChange}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
      />
    </div>
  )
}
