import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import {
  editBaseAmount,
  markSelected,
  setStatus,
  updateExtra,
} from "../actions/finalize"

import DateFormatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"

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

  const { baseItem, nextItems } = item
  const {
    id,
    expense,
    floatRemaining,
    monthly,
    name,
    remaining,
    status,
   } = baseItem

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
      amount: (baseItem.amount - amount)
    })
    dispatch(action)
  }

  const nextItem = nextItems.find(i => i.selected)

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
          monthly={true}
          nextItem={nextItem}
          nextMonthString={nextMonthString}
        />
        <NextMonthTotal
          amount={amount}
          errors={errors()}
          nextItem={nextItem}
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
            budgetCategoryId={baseItem.budgetCategoryId}
            baseItemId={id}
            dispatch={dispatch}
            errors={errors()}
            monthly={monthly}
            nextItem={nextItem}
            nextMonth={nextMonth}
            nextYear={nextYear}
          />
        </div>
        <NextMonthItemSelect
          baseItemId={id}
          dispatch={dispatch}
          nextItems={nextItems}
          showNextItems={status === "showNextItems"}
        />
      </div>
    </div>
  )
}

const NextMonthTotal = ({ amount, errors, nextItem, nextMonthString }) => {
  if (!nextItem || errors.length > 0) {
    return null
  }

  return (
    <Total
      amount={amount}
      errors={errors}
      nextItem={nextItem}
      nextMonthString={nextMonthString}
    />
  )
}

const NextMonthItemSelect = ({ baseItemId, dispatch, nextItems, showNextItems }) => {
  const count = nextItems.length
  if (count === 0) {
    return null
  }

  const selectedItem = nextItems.find(item => item.selected)

  const revealNextItems = () => {
    const action = setStatus({
      id: baseItemId,
      status: "showNextItems"
    })
    dispatch(action)
  }

  const hideNextItems = () => {
    dispatch(setStatus({
      id: baseItemId,
      status: "pending"
    }))
    dispatch(markSelected({ id: null }))
  }

  if (!showNextItems) {
    return (
      <div className="existing-items">
        <div className="item">
          <button
            to="#"
            onClick={revealNextItems}
          >
            {titleize(copy.finalize.revealNextItems(count))}
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="existing-items">
        {nextItems.map(item => (
          <NextItemRadio
            key={item.id}
            {...item}
            dispatch={dispatch}
            label={MoneyFormatter(item.amount, { absolute: false })}
            selectedItem={selectedItem}
          />
        ))}
        <div className="item">
          <button
            to="#"
            onClick={hideNextItems}
          >
            {titleize(copy.finalize.createItem)}
          </button>
        </div>
      </div>
    )
  }
}

const NextItemRadio = ({ id, dispatch, label, selectedItem }) => {
  const handleChange = () => {
    const action = markSelected({ id: id })
    dispatch(action)
  }

  const selected = selectedItem && (selectedItem.id === id)

  return (
    <div className="item">
      <span>{label}</span>
      <span>
        <input
          checked={selected ? "checked" : ""}
          name="next-item"
          onChange={handleChange}
          value={id}
          type="radio"
        />
      </span>
    </div>
  )
}
