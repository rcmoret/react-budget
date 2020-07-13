import React from "react"

import { Link } from "react-router-dom"
import { transaction as copy } from "../../../locales/copy"

import EvaluateInput from "../../../functions/DynamicInputEvaluator"

export default ({ index, detail, onDetailChange, onKeyDown }) => {
  const onChange = (e) => {
    onDetailChange(_id, { amount: e.target.value })
  }

  const onCalculate = () => {
    onDetailChange(_id, { amount: EvaluateInput(amount) })
  }

  const {
    id,
    amount,
    disabled,
  } = detail

  const _id = id || index

  return (
    <div className="detail-amount">
      <input
        type="text"
        name={`detail[${_id}][amount]`}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={copy.amount}
        value={amount}
      />
      <div className="calculator-button">
        <Link
          to="#"
          className="fas fa-calculator"
          onClick={onCalculate}
        />
      </div>
    </div>
  )
}
