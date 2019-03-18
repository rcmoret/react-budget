import React from "react"

import Select from "react-select"

export default ({ _id, options, onSubChange }) => {
  const onChange = (e) => {
    onSubChange(_id, { budget_item_id: e.value })
  }

  return (
    <div className="subtransaction-budget-item-select">
      <Select
        options={options}
        onChange={onChange}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
      />
    </div>
  )
}
