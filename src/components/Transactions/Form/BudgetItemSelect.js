import React from "react"
import { connect } from "react-redux"

import { fetchedBudgetItems } from "../../../actions/transactions"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { fromDateString } from "../../../functions/DateFormatter"
import { get } from "../../../functions/ApiClient"

import Select from "react-select"
import DetailBudgetItemSelect from "./DetailBudgetItemSelect"

const BudgetItemSelect = (props) => {
  const {
    amount,
    dateObject,
    details,
    dispatch,
    emptyOption,
    fetched,
    month,
    onChange,
    onDetailChange,
    options,
    value,
    year,
  } = props

  if (!(fetched && month === dateObject.month && year === dateObject.year)) {
    const url = ApiUrlBuilder(["budget", "items"], { ...dateObject })
    get(url, data => dispatch(fetchedBudgetItems(data)))
  }

  const updateSelect = (e) => {
    if (amount === "" && e.monthly) {
      onChange({ budget_item_id: e.value, amount: e.amount })
    } else {
      onChange({ budget_item_id: e.value })
    }
  }

  if (details.length > 1) {
    return (
      <div className="budget-item-select">
        <Select
          className="budget-item-select-container"
          classNamePrefix="budget-item-select"
          disabled={true}
          value={emptyOption}
        />
        {details.map((detail, index) =>
          <DetailBudgetItemSelect
            key={detail._id || index}
            _id={detail._id || index}
            onDetailChange={onDetailChange}
            options={options}
            {...detail}
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
  const { details, options } = ownProps
  const emptyOption = { label: "", value: null }
  const budgetItemId = details.length === 1 ? details[0].budget_item_id : null
  const value = options.find(opt => opt.value === budgetItemId) || emptyOption

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
