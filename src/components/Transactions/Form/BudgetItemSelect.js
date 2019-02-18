import React from "react"
import { connect } from "react-redux"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import Select from "react-select"

const BudgetItemSelect = ({ disabled, options, updateSelect, value }) => {
  return (
    <div className='budget-item-select'>
      <Select
        options={options}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
        isSearchable={!disabled}
        isDisabled={disabled}
        onChange={updateSelect}
        value={value}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const items = state.transactions.budgetItems.collection
  const collection = items.filter(item => !item.monthly || item.deletable)
  const labelFor = (item) => `${item.name} (${MoneyFormatter(item.remaining, { absolute: true })})`
  const itemOptions = collection.map(item => {
    return { value: item.id, label: labelFor(item) }
  }).sort((a, b) => {
    return a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  })
  const discretionary = { label: "Discretionary", value: null }
  const options = [discretionary, ...itemOptions]
  const { disabled } = ownProps
  const emptyOption = { label: "", value: null }
  const budgetItemId = ownProps.budgetItemId || null
  const value = disabled ? emptyOption : options.find(opt => opt.value === budgetItemId)

  return {
    options: options,
    value: value,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(BudgetItemSelect)
