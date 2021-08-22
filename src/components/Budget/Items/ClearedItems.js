import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { budget as copy } from "../../../locales/copy"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import formatter from "../../../functions/DateFormatter"
import MoneyFormatter from "../../../functions/MoneyFormatter"
import { post } from "../../../functions/ApiClient"
import { titleize } from "../../../locales/functions"
import { removeMonthlyItem } from "../../../actions/budget"

import GroupHeader from "./GroupHeader"
import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"
import MonthlyDetail from "./MonthlyDetail"

const ClearedItems = ({ dispatch, expenses, revenues, showCleared }) => {
  if (showCleared) {
    return (
      <div>
        <h3>{titleize(copy.item.cleared)}</h3>
        <ClearedGroup
          collection={revenues}
          dispatch={dispatch}
          title={titleize(copy.category.revenues)}
        />
        <ClearedGroup
          collection={expenses}
          dispatch={dispatch}
          title={titleize(copy.category.expenses)}
        />
      </div>
    )
  } else {
    return null
  }
}

const ClearedGroup = ({ collection, dispatch, title }) => {
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <GroupHeader title={title} />
        {collection.map(item =>
          <ClearedItem
            key={item.id}
            dispatch={dispatch}
            {...item}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

const ClearedItem = (props) => {
  const {
    amount,
    difference,
    expense,
    icon_class_name,
    name,
    spent,
  } = props

  const {
    budgeted,
  } = copy.item

  const {
    deposited,
    minus,
    plus,
  } = copy.shared

  const operator = difference === 0 ? "" : (difference > 0 ? minus : plus)

  return (
    <div className="budget-item-cleared">
      <div className="flex flex-space-between cleared-item-name">
        <div>
          <Icon className="fas fa-caret-down" />
          {" "}
          <strong>{name}</strong>
          {" "}
          <Icon className={icon_class_name} />
        </div>
        <div>
          <DeleteButton {...props} />
        </div>
      </div>
      <div className="cleared-item-wrapper">
        <em>{titleize(budgeted)}:</em>
        {MoneyFormatter(amount, { absolute: true })}
      </div>
      <div className="cleared-item-wrapper">
        <em>{titleize(expense ? copy.shared.spent : deposited)}:</em>
        {MoneyFormatter(spent, { absolute: true })}
      </div>
      <div className="cleared-item-wrapper">
        <em>{titleize(copy.shared.difference)}:</em>
        {operator}
        {MoneyFormatter(difference, { absolute: true })}
      </div>
      <MonthlyDetail showDetail={true} {...props} />
    </div>
  )
}

const DeleteButton = ({ id, amount, deletable, dispatch, name, month, year }) => {
  if (deletable) {
    const onClick = () => {
      const dateString = formatter({ month: month, year: year, format: "shortMonthYear" })
      const confirmation = window.confirm(copy.item.deleteConfirmationMessage(name, dateString))
      if (confirmation) {
        const url = ApiUrlBuilder({ route: "budget-items-events-index" })
        const event = EventMessageBuilder({
          eventType: "budget-item-delete",
          id: id,
          category: name,
          amount: amount,
          month: month,
          year: year
        })
        const body = JSON.stringify({
          events: [
            {
              budget_item_id: id,
              event_type: "item_delete",
            },
          ],
        })
        const onSuccess = () => dispatch(removeMonthlyItem({ id: id }))
        onSuccess()
        post(url, body, { events: [event], onSuccess: onSuccess })
      }
    }

    return (
      <div>
        <Link
          to="#"
          className="fas fa-trash-alt"
          onClick={onClick}
        />
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  const { collection } = state.budget.monthly
  const { showCleared } = state.budget.menuOptions

  const sortByAmount = (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
  const sortByName = (a, b) => {
    if (a.name < b.name) {
      return -1
    } else if (a.name > b.name) {
      return 1
    } else {
      return sortByAmount(a, b)
    }
  }

  const sortOrder = state.budget.menuOptions.sortOrder
  const sortFn = () => {
    switch (sortOrder) {
    case "byAmount":
      return sortByAmount
    case "byName":
      return sortByName
    default:
      return sortByName
    }
  }

  const revenues = collection.filter(item => !item.expense && item.isCleared)
    .sort(sortFn())
  const expenses = collection.filter(item => item.expense && item.isCleared)
    .sort(sortFn())

  return {
    expenses: expenses,
    revenues: revenues,
    showCleared: showCleared,
  }
}

export default connect(mapStateToProps)(ClearedItems)
