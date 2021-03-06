import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"
import DetailAmount from "./DetailAmount"
import DetailBudgetItemSelect from "./DetailBudgetItemSelect"
import { Link } from "react-router-dom"

export default (props) => {
  const {
    addDetail,
    budget_exclusion,
    details,
    detailCount,
    handleKeyDown,
    onDetailChange,
    options,
    removeDetail,
  } = props

  const total = details.reduce((acc, detail) => acc + (parseFloat(detail.amount || 0)), 0)
  const nullFn = () => null
  const initialDetail = { id: 0, amount: MoneyFormatter(total * 100), disabled: true, handleKeyDown: nullFn, onDetailChange: nullFn, budgetItemId: null }

  const detailCollection = (detailCount === 1) ? details : [initialDetail, ...details]
  const indexFor = index => (detailCount === 1) ? 0 : index - 1
  const isLastDetail = index => detailCount === 1 || index === detailCount

  return (
    detailCollection.map((detail, index) => {
      return (
        <div className="transaction-row" key={index}>
          <DetailAmount
            index={indexFor(index)}
            detail={detail}
            onDetailChange={onDetailChange}
            onKeyDown={handleKeyDown}
          />
          <div className="budget-item-select">
            <DetailBudgetItemSelect
              index={indexFor(index)}
              budget_exclusion={budget_exclusion}
              detail={detail}
              onDetailChange={onDetailChange}
              options={options}
            />
          </div>
          <AddDetail
            {...detail}
            addDetail={addDetail}
            index={index}
            isLastDetail={isLastDetail}
            removeDetail={removeDetail}
          />
        </div>
      )
    })
  )
}

const AddDetail = ({ id, addDetail, detail, index, removeDetail }) => {
  const _id = id || index - 1
  const onRemove = () => removeDetail(_id, detail)

  if (index === 0) {
    return (
      <Link to="#" onClick={addDetail} tabIndex="-1" className="fas fa-plus-circle" />
    )
  } else {
    return (
      <Link to="#" onClick={onRemove} tabIndex="-1" className="fas fa-times-circle" />
    )
  }
}
