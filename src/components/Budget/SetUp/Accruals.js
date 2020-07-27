import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import {
  addItem,
  editAccrualAmount,
  markForInclusion,
  markReviewed,
  markSubmitted,
} from "../../../actions/budget/setup"
import * as dateFormatter from "../../../functions/DateFormatter"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import delay from "../../../functions/Delay"
import EvaluateInput from "../../../functions/DynamicInputEvaluator"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import { post } from "../../../functions/ApiClient"

import Icon from "../../Icons/Icon"
import Items from "./Items"
import { Link } from "react-router-dom"
import { Redirect } from "react-router-dom"

const Accruals = (props) => {
  const {
    accruingExpenses,
  } = copy.setup

  const {
    baseMonth,
    collection,
    dispatch,
    isFetched,
    month,
    paramMonth,
    paramYear,
    year,
  } = props

  const reviewCount = collection.filter(item => !item.reviewed).length
  const prevMonthString = dateFormatter.formatted({
    month: baseMonth.month,
    year: baseMonth.year,
    format: "monthYear"
  })

  if (!isFetched) {
    return (
      <Redirect to={`/budget/set-up/${paramMonth}/${paramYear}/intro`} />
    )
  } else if (reviewCount > 0) {
    return (
      <div className="set-up-workspace">
        <div className="previous-month-items">
          <h4>{prevMonthString}</h4>
          <h5>{titleize(accruingExpenses)}</h5>
          <div className="review-accruals">
            {collection.map(item =>
              <Item
                key={item.id}
                dispatch={dispatch}
                item={item}
              />
            )}
          </div>
          <SubmitButton
            collection={collection}
            dispatch={dispatch}
            month={month}
            year={year}
          />
        </div>
        <Items />
      </div>
    )
  } else {
    return (
      <Redirect to={`/budget/set-up/${month}/${year}/expenses`} />
    )
  }
}

const SubmitButton = ({ collection, dispatch, month, year }) => {
  const {
    accrualButtonText,
  } = copy.setup

  const submit = (item) => {
    const amount = item.updatedProps ? decimalToInt(EvaluateInput(item.updatedProps.amount)) : item.defaultAmount
    const url = ApiUrlBuilder({ route: "budget-category-items-index", id: item.budget_category_id })
    const body = JSON.stringify({ amount: amount, month: month, year: year })
    const onSuccess = data => dispatch(addItem(data))
    const event = EventMessageBuilder({ eventyType: "budget-item-create" })
    post(url, body, { onSuccess: onSuccess, event: event })
  }

  const submitAccruals = async () => {
    for (let item of collection) {
      dispatch(markSubmitted({ id: item.id }))
      await delay(400)
      if (!item.markedForExclusion) {
        submit(item)
      }
      dispatch(markReviewed({ id: item.id }))
    }
  }

  return (
    <div className="accrual-submit">
      <button
        type="submit"
        onClick={submitAccruals}
      >
        {titleize(accrualButtonText)}
      </button>
    </div>
  )
}

const Item = (props) => {
  const { dispatch } = props
  const item = {
    ...props.item,
    amount: parseFloat(props.item.defaultAmount / 100.0).toFixed(2),
    ...props.item.updatedProps
  }

  const {
    id,
    amount,
    markedForExclusion,
    name,
  } = item

  const include = (e) => {
    e.preventDefault()
    const action = markForInclusion({ id: id, exclude: false })
    dispatch(action)
  }

  const exclude = (e) => {
    e.preventDefault()
    const action = markForInclusion({ id: id, exclude: true })
    dispatch(action)
  }

  const handleUpdate = (e) => {
    const action = editAccrualAmount({ id: id, amount: e.target.value })
    dispatch(action)
  }

  const itemState = () => {
    if (item.submitted && !item.reviewed) {
      return "submitted"
    } else if (item.reviewed && !markedForExclusion) {
      return "reviewed"
    } else if (markedForExclusion) {
      return "markedForExclusion"
    } else {
      return "markedForInclusion"
    }
  }

  const iconClass = () => {
    switch(itemState()) {
    case "submitted":
      return "fas fa-compact-disc fa-spin"
    case "reviewed":
      return "fas fa-check-circle"
    default:
      return "far fa-check-circle"
    }
  }

  const spanClass = () => {
    switch(itemState()) {
    case "reviewed":
      return "created"
    case "markedForExclusion":
      return ""
    default:
      return "active"
    }
  }


  return (
    <div className="accrual-item">
      <div className="label">{name}</div>
      <div className="input">
        <input
          type="text"
          value={amount}
          onChange={handleUpdate}
        />
      </div>
      <div className="buttons">
        <div className="check">
          <Button
            handleClick={include}
            iconClass={iconClass()}
            spanClass={spanClass()}
          />
        </div>
        <div className="ex">
          <Button
            handleClick={exclude}
            iconClass="far fa-times-circle"
            spanClass={markedForExclusion ? "active" : ""}
          />
        </div>
      </div>
    </div>
  )
}

const Button = ({ handleClick, iconClass, spanClass }) => (
  <span className={spanClass}>
    <Link
      to="#"
      onClick={handleClick}
    >
      <Icon className={iconClass} />
    </Link>
  </span>
)

const mapStateToProps = (state, ownProps) => {
  const paramMonth = parseInt(ownProps.match.params.month)
  const paramYear = parseInt(ownProps.match.params.year)
  const { month, year } = state.budget.setup.newMonth
  const { isFetched } = state.budget.setup.baseMonth
  const categories = state.budget.categories.collection
  const findCategory = (item) => categories.find(c => c.id === item.budget_category_id)
  const mergeDefaultAmount = (item) => (
    { ...item, defaultAmount: findCategory(item).default_amount }
  )

  const collection = state.budget.setup.baseMonth.collection
    .filter(item => item.accrual)
    .map(mergeDefaultAmount)
    .sort((a, b) => a.name < b.name ? -1 : 1)

  return {
    baseMonth: state.budget.setup.baseMonth,
    collection: collection,
    isFetched: isFetched,
    paramMonth: paramMonth,
    paramYear: paramYear,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(Accruals)
