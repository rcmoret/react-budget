import React from "react"
import { connect } from "react-redux"

import * as dateFormatter from "../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { baseMonthFetched, newMonthFetched } from "../../../actions/budget"
import { Redirect } from "react-router"

import Review from "./Review"

const Intro = (props) => {
  const { baseMonth, collection, newMonth, targetMonth, targetYear } = props
  const { month, year } = newMonth
  const monthString = dateFormatter.formatted({ month: newMonth.month, year: newMonth.year, format: "monthYear" })
  const emptyCollection = newMonth.isFetched &&  collection.length === 0

  if (!newMonth.isFetched) {
    const url = ApiUrlBuilder(["budget", "items"], { month: targetMonth, year: targetYear })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(newMonthFetched(data)))
  }

  if (newMonth.isFetched && !baseMonth.isFetched) {
    const month = targetMonth === 1 ? 12 : (targetMonth - 1)
    const year = targetMonth === 1 ? (targetYear - 1) : targetYear
    const url = ApiUrlBuilder(["budget", "items"], { month: month, year: year })
    fetch(url)
      .then(response => response.json())
      .then(data => props.dispatch(baseMonthFetched(data)))
  }

  if (emptyCollection || newMonth.reviewed) {
    return (
      <Redirect to={`/budget/set-up/${month}/${year}/add-new`} />
    )
  } else { // show the review items
    return (
      <div className="set-up-workspace">
        <div className="set-up-intro">
          <p>
            Looks like there are some items already created for {monthString}. Let's review those first.
          </p>
          <Review
            collection={collection}
            month={month}
            year={year}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const targetMonth = parseInt(ownProps.match.params.month)
  const targetYear = parseInt(ownProps.match.params.year)
  const newMonth = state.budget.setup.newMonth
  const collection = newMonth.collection.sort((a, b) => {
    if (a.expense && !b.expense) {
      return 1
    } else if (!a.expense && !b.expense) {
      return a.amount <= b.amount ? 1 : -1
    } else if (a.expense && b.expense) {
      return a.amount >= b.amount ? 1 : -1
    } else { /* a is revenue && b.expense */
      return -1
    }
  })

  return {
    baseMonth: state.budget.setup.baseMonth,
    collection: collection,
    newMonth: newMonth,
    targetMonth: targetMonth,
    targetYear: targetYear,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Intro)
