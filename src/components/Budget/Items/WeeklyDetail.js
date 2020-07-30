import React from "react"
import { connect } from "react-redux"

import { fetchedWeeklyBudgetItemEvents, fetchedWeeklyTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"

import Details from "../Shared/Details"
import Events from "../Shared/Events"

const WeeklyDetail = (props) => {
  const {
    id,
    budget_category_id,
    budgetedPerDay,
    budgetedPerWeek,
    collection,
    combinedEvents,
    dispatch,
    events,
    isApiUnauthorized,
    remainingPerDay,
    remainingPerWeek,
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
    const onSuccess = data => dispatch(fetchedWeeklyTransactions({
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
    const onSuccess = data => dispatch(fetchedWeeklyBudgetItemEvents({
      id: id,
      events: data
    }))
    get(url, onSuccess)
  }

  return (
    <div className="detail-wrapper">
      <hr />
      <Details
        budgetedPerDay={budgetedPerDay}
        budgetedPerWeek={budgetedPerWeek}
        remainingPerDay={remainingPerDay}
        remainingPerWeek={remainingPerWeek}
      />
      <hr />
      <Events
        events={combinedEvents}
      />
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

  const { events } = ownProps
  let budgetedAmount = 0
  let remaining = 0
  const eventsWithBalance = [...events, ...collection]
    .map(event => ({ ...event, isTransaction: Object(event).hasOwnProperty("transaction_entry_id") }))
    .sort((a, b) => a.created_at > b.created_at ? 1 : -1)
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

export default connect(mapStateToProps)(WeeklyDetail)
