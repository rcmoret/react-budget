import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import {
  editBaseAmount,
  updateExtra,
} from "../actions/finalize"

import DateFormatter from "../../../functions/DateFormatter"

import AmountForExtra from "./Items/AmountForExtra"
import ApplyToExtra from "./Items/ApplyToExtra"
import Errors from "../../Errors/Errors"
import NextMonthItem from "./Items/NextMonthItem"
import Submit from "./Items/Submit"
import Total from "./Items/Total"

export default (props) => {
  const {
    dispatch,
    item,
    month,
    nextMonth,
    nextYear,
    year,
  } = props

  const { baseItem } = item
  const { id, expense, floatRemaining, monthly, name, remaining } = baseItem
  const format = "numericMonthYear"
  const baseMonthString = DateFormatter({
    month: month,
    year: year,
    format: format,
  })
  const nextMonthString = DateFormatter({
    month: nextMonth,
    year: nextYear,
    format: format,
  })

  const handleChange = (e) => {
    const action = editBaseAmount({
      ...baseItem,
      floatRemaining: (e.target.value || 0)
    })
    dispatch(action)
    _updateExtra(parseFloat(e.target.value * 100))
  }

  const _updateExtra = (amount) => {
    const action = updateExtra({
      id: id,
      name: name,
      amount: (baseItem.remaining - amount)
    })
    dispatch(action)
  }

  const amount = floatRemaining === undefined ? (remaining / 100.0).toFixed(2) : (floatRemaining || 0)

  const errors = () => {
    const errorMessages = []
    if (Math.abs(parseInt(amount * 100)) > (Math.abs(remaining) + 1)) {
      errorMessages.push(copy.finalize.exceedsOriginalAmount)
    }
    if (expense && amount > 0) {
      errorMessages.push(copy.finalize.positiveExpenseErrorMessage)
    }
    if (!expense && amount < 0) {
      errorMessages.push(copy.finalize.negativeRevenueErrorMessage)
    }
    return errorMessages
  }

  return (
    <div className="finalize-workspace">
      <h4>{titleize(copy.finalize.carryOver)}</h4>
      <div className="finalize-carry-over">
        <div className="item-name">
          {name}
        </div>
        <div className="remaining">
          <div>
            {copy.finalize.carryOverFrom(baseMonthString)}:
          </div>
          <div>
            <input
              className={errors().length > 0 ? "errors" : ""}
              name="remaining"
              onChange={handleChange}
              type="text"
              value={amount || ""}
            />
            <Errors errors={errors()} />
          </div>
        </div>
        <NextMonthItem
          nextItem={item.nextItems[0]}
          nextMonthString={nextMonthString}
        />
        <Total
          amount={amount}
          errors={errors()}
          nextItem={item.nextItems[0]}
          nextMonthString={nextMonthString}
        />
        <AmountForExtra
          amount={amount}
          errors={errors()}
          remaining={remaining}
        />
        <div className="submit-row">
          <ApplyToExtra
            amount={amount}
            baseItem={baseItem}
            dispatch={dispatch}
          />
          <Submit
            amount={amount}
            budgetCategoryId={baseItem.budget_category_id}
            baseItem={baseItem}
            dispatch={dispatch}
            errors={errors()}
            monthly={monthly}
            nextItem={item.nextItems[0]}
            nextMonth={nextMonth}
            nextYear={nextYear}
          />
        </div>
      </div>
    </div>
  )
}
