import React from "react"
import { connect } from "react-redux"

import { fetchedDiscretionaryTransactions } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get } from "../../../functions/ApiClient"

import Details from "../Shared/Details"
import Events from "./../Shared/Events"

const DiscretionaryDetail = (props) => {
  const {
    amount,
    isApiUnauthorized,
    days_remaining,
    dispatch,
    fetchedTransactions,
    month,
    showDetail,
    total_remaining,
    total_days,
    transactions,
    year,
  } = props

  if (!showDetail) {
    return null
  }

  if (!isApiUnauthorized && showDetail && !fetchedTransactions ) {
    const url = ApiUrlBuilder({
      route: "discretionary-transactions-index",
      query: { month: month, year: year }
    })
    const onSuccess = data => dispatch(fetchedDiscretionaryTransactions(data))
    get(url, onSuccess)
  }

  const budgetedPerDay = Math.floor(amount / total_days)
  const remainingPerDay = days_remaining === 0 ? total_remaining : Math.floor(total_remaining / days_remaining)

  return (
    <div className="detail-wrapper">
      <hr />
      <Details
        budgetedPerDay={budgetedPerDay}
        budgetedPerWeek={budgetedPerDay * 7}
        remainingPerDay={remainingPerDay}
        remainingPerWeek={remainingPerDay * 7}
      />
      <hr />
      <Events
        events={transactions}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
  const sortFn = (a, b) => {
    if (a.created_at === b.created_at) {
      return 0
    } else if (a.created_at === null) {
      return b.created_at > today ? -1 : 1
    } else if (b.created_at === null) {
      return a.created_at > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.created_at > b.created_at) ? 1 : -1
    }
  }
  const { amount, collection } = state.budget.discretionary
  let remaining = (-1 * amount)
  const transactions = collection
    .sort(sortFn)
    .map(transaction => {
      remaining -= transaction.amount
      return {
        ...transaction,
        budgetedAmount: amount,
        remaining: remaining,
        isTransaction: true
      }
    })

  const isApiUnauthorized = state.api.status === 401

  return {
    ...state.budget.metadata,
    ...state.budget.discretionary,
    isApiUnauthorized: isApiUnauthorized,
    transactions: transactions
  }
}

export default connect(mapStateToProps)(DiscretionaryDetail)
