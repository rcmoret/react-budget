import React from "react"

import Select from "react-select"

export default (props) => {
  const { _id, budget_category, budget_item_id, options, onSubChange } = props
  const onChange = (e) => {
    onSubChange(_id, { budget_item_id: e.value })
  }
  const value = { label: budget_category, value: budget_item_id }
  const emptyValue = { label: "Discretionary", value: null }
  const selectedValue = budget_category ? value : emptyValue

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
