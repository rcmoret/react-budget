import React from "react"

import { Link } from "react-router-dom"
import { transaction as copy } from "../../../locales/copy"

import EvaluateInput from "../../../functions/DynamicInputEvaluator"

export default ({ index, detail, onDetailChange, onKeyDown }) => {
  const {
    id,
    amount,
    disabled,
  } = detail

  const _id = id || index

  const onChange = (e) => {
    onDetailChange(_id, { amount: e.target.value })
  }

  const calculateAmount = () => {
    onDetailChange(_id, { amount: EvaluateInput(amount) })
  }

  const isEligibleForCalculation = EvaluateInput(amount) !== amount

  const handleKeyDown = e => {
    if (e.which === 13) {
      if (isEligibleForCalculation) {
        calculateAmount()
      }
      onKeyDown(e)
    }
  }

  return (
    <div className="detail-amount">
      <input
        type="text"
        name={`detail[${_id}][amount]`}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={copy.amount}
        value={amount}
      />
      <CalculatorButton
        calculateAmount={calculateAmount}
        showable={isEligibleForCalculation}
      />
    </div>
  )
}

const CalculatorButton = ({ calculateAmount, showable }) => {
  if (showable) {
    return (
      <div className="calculator-button">
        <Link
          to="#"
          className="fas fa-calculator"
          onClick={calculateAmount}
        />
      </div>
    )
  } else {
    return null
  }
}
