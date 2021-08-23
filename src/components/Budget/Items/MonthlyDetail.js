import React from "react"
import { connect } from "react-redux"

import { fetchedMonthlyBudgetItemEvents, fetchedMonthlyTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"
import { endOfDayFromDateString } from "../../../functions/DateFormatter"

import Events from "../Shared/Events"

const MonthlyDetail = (props) => {
  const {
    id,
    budget_category_id,
    collection,
    combinedEvents,
    dispatch,
    events,
    isApiUnauthorized,
    showDetail,
    transaction_count,
  } = props

  if (!showDetail) {
    return null
  }

  if (!isApiUnauthorized && collection.length < transaction_count) {
    const url = ApiUrlBuilder({
      route: "budget-item-transactions-index",
      id: id,
      budgetCategoryId: budget_category_id,
    })
    const onSuccess = data => dispatch(fetchedMonthlyTransactions({
      id: id,
      collection: data
    }))
    get(url, onSuccess)
    return null
  }

  if (!isApiUnauthorized && events.length === 0) {
    const url = ApiUrlBuilder({
      route: "budget-item-events-index",
      id: id,
      budgetCategoryId: budget_category_id,
    })
    const onSuccess = data => dispatch(fetchedMonthlyBudgetItemEvents({
      id: id,
      events: data
    }))
    get(url, onSuccess)
  }

  return (
    <div className="detail-wrapper">
      <hr />
      <Events events={combinedEvents} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)

  const collection = ownProps.collection.sort((a, b) => {
    if (a.clearance_date === b.clearance_date) {
      return 0
    } else if (a.clearance_date === null) {
      return b.clearance_date > today ? -1 : 1
    } else if (b.clearance_date === null) {
      return a.clearance_date > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.clearance_date > b.clearance_date) ? 1 : -1
    }
  })
  const sortFn = (a, b) => {
    if (!a.isTransaction && !b.isTransaction) {
      return a.created_at > b.created_at ? 1 : -1
    } else if (a.isTransaction && b.isTransaction) {
      return 1 // these are already sorted
    } else { // comparing transaction and event
      if (a.isTransaction) {
        if (a.clearance_date === null) {
          return 1
        } else {
          return endOfDayFromDateString(a.clearance_date) > new Date(b.created_at) ? 1 : -1
        }
      } else { // b.isTransaction
        if (b.clearance_date === null) {
          return -1
        } else {
          return endOfDayFromDateString(b.clearance_date) > new Date(a.created_at) ? -1 : 1
        }
      }
    }
  }

  const { events } = ownProps
  let budgetedAmount = 0
  let remaining = 0
  const eventsWithBalance = [...events, ...collection]
    .map(event => ({ ...event, isTransaction: Object(event).hasOwnProperty("transaction_entry_id") }))
    .sort(sortFn)
    .map(event => {
      const { amount } = event
      budgetedAmount += (event.isTransaction ? 0 : amount)
      remaining += (event.isTransaction ? (-1 * amount) : amount)
      return { ...event, budgetedAmount: budgetedAmount, remaining: remaining }
    })
  const isApiUnauthorized = state.api.status === 401

  return {
    ...ownProps,
    isApiUnauthorized: isApiUnauthorized,
    collection: collection,
    events: events,
    combinedEvents: eventsWithBalance,
  }
}

export default connect(mapStateToProps)(MonthlyDetail)
