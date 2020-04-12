import React from "react"
import { connect } from "react-redux"

import { fromDateString } from "../../../functions/DateFormatter"

import Select from "react-select"
import DetailBudgetItemSelect from "./DetailBudgetItemSelect"

const BudgetItemSelect = (props) => {
  const {
    budget_exclusion,
    primaryDetail,
    details,
    emptyOption,
    onDetailChange,
    options,
  } = props


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
      <div className="budget-item-select">
        <DetailBudgetItemSelect
          _id={primaryDetail._id || 0}
          budget_exclusion={budget_exclusion}
          onDetailChange={onDetailChange}
          options={options}
          {...primaryDetail}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const dateObject = fromDateString(state.transactions.metadata.date_range[0], { format: "object" })
  const { details, options } = ownProps
  const primaryDetail = details.length === 1 ? details[0] : null
  const emptyOption = { label: "", value: null }
  const budgetItemId = details.length === 1 ? details[0].budget_item_id : null
  const value = options.find(opt => opt.value === budgetItemId) || emptyOption

  return {
    dateObject: dateObject,
    primaryDetail: primaryDetail,
    emptyOption: emptyOption,
    options: options,
    value: value,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(BudgetItemSelect)
