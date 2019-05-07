import React from "react"
import { connect } from "react-redux"

import AddNew from "./AddNew"
import Review from "./Review"

const Intro = ({ baseMonthString, collection, monthString, newMonth, reviewQueue }) => {
  const { month, year } = newMonth
  if (newMonth.isReady) {
    return null
  } else if (reviewQueue > 0 || !newMonth.reviewed) {
    return (
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
    )
  } else {
    return (
      <AddNew
        baseMonthString={baseMonthString}
        newMonth={newMonth}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const newMonth = state.budget.setup.newMonth
  const collection = newMonth.collection.sort((a, b) => {
    if (a.expense && !b.expense) {
      return 1
    } else if (!a.expense && !b.expense) {
      return a.amount < b.amount ? 1 : -1
    } else if (a.expense && b.expense) {
      return a.amount > b.amount ? 1 : -1
    } else { /* a is revenue && b.expense */
      return -1
    }
  })
  const reviewQueue = collection.reduce((acc, item) => acc += (item.reviewed ? 0 : 1), 0)

  return {
    collection: collection,
    reviewQueue: reviewQueue,
    newMonth: newMonth,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Intro)
