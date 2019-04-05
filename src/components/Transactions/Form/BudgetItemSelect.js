import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { fetchedBudgetItems } from "../../../actions/transactions"
import { fromDateString } from "../../../shared/Functions/DateFormatter"
import Select from "react-select"

import SubtransactionBudgetItemSelect from "./SubtransactionBudgetItemSelect"

const BudgetItemSelect = (props) => {
  const { dateObject, dispatch, emptyOption, fetched, month,
    onChange, onSubChange, options, subtransactions, value, year } = props

  if (!(fetched && month === dateObject.month && year === dateObject.year)) {
    const url = ApiUrlBuilder(["budget", "items"], { ...dateObject })
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetchedBudgetItems(data)))
  }

  const updateSelect = (e) => {
    onChange({ budget_item_id: e.value })
  }

  if (subtransactions.length > 0) {
    return (
      <div className="budget-item-select">
        <Select
          className="budget-item-select-container"
          classNamePrefix="budget-item-select"
          disabled={true}
          value={emptyOption}
        />
        {subtransactions.map((sub, index) =>
          <SubtransactionBudgetItemSelect
            key={sub.id || index}
            _id={sub.id || index}
            onSubChange={onSubChange}
            options={options}
            {...sub}
          />
        )}
      </div>
    )
  } else {
    return (
      <div className='budget-item-select'>
        <Select
          options={options}
          className="budget-item-select-container"
          classNamePrefix="budget-item-select"
          onChange={updateSelect}
          value={value}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { fetched, month, year } = state.transactions.budgetItems
  const dateObject = fromDateString(state.transactions.metadata.date_range[0], { format: "object" })
  const { options } = ownProps
  const emptyOption = { label: "", value: null }
  const budget_item_id = ownProps.budget_item_id || null
  const value = options.find(opt => opt.value === budget_item_id) || emptyOption

  return {
    dateObject: dateObject,
    emptyOption: emptyOption,
    fetched: fetched,
    month: month,
    options: options,
    value: value,
    year: year,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(BudgetItemSelect)
