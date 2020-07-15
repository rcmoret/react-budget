import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../../locales/copy"
import { titleize } from "../../../../locales/functions"
import {
  accrualMaturityIntervalsFetched,
  updated,
} from "../../../../actions/budget/categories"

import * as DateFunctions from "../../../../functions/DateFormatter"
import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import { get } from "../../../../functions/ApiClient"
import GroupBy from "../../../../functions/GroupBy"

import Icon from "../../../Icons/Icon"
import NewMaturityInterval from "./New"
import { Link } from "react-router-dom"
import Show from "./Show"

const MaturityInfo = (props) => {
  const {
    id,
    accrual,
    apiErrorPresent,
    apiKey,
    dispatch,
    maturityIntervals,
    maturityIntervalsFetched,
    newMaturityIntervalAttributes,
    showMaturityIntervalForm,
    showMaturityIntervals,
  } = props

  if (!apiErrorPresent && !maturityIntervalsFetched && showMaturityIntervals) {
    const url = ApiUrlBuilder({
      route: "budget-category-maturity-intervals-index",
      budgetCategoryId: id,
      query: { key: apiKey },
    })
    const onSuccess = data => dispatch(
      accrualMaturityIntervalsFetched({
        id: id,
        collection: data,
      })
    )
    get(url, onSuccess)
  }

  const fetchMaturityIntervals = () => {
    const action = updated({ id: id, showMaturityIntervals: true })
    dispatch(action)
  }

  const hideMaturityIntervals = () => {
    const action = updated({ id: id, showMaturityIntervals: false })
    dispatch(action)
  }

  const toggleForm = () => {
    const year = DateFunctions.today("object").year
    const action = updated({
      id: id,
      newMaturityIntervalAttributes: {
        month: "",
        year: year,
      },
      showMaturityIntervalForm: !showMaturityIntervalForm
    })
    dispatch(action)
  }

  if (accrual && !showMaturityIntervals) {
    return (
      <div className="category-maturity-intervals">
        <Link
          to="#"
          onClick={fetchMaturityIntervals}
        >
          <Icon className="fas fa-info-circle" />
        </Link>
      </div>
    )
  } else if (accrual) {
    const groupedIntervals = GroupBy(maturityIntervals, "year")

    return (
      <div className="category-maturity-intervals">
        <div className="maturity-interval-label">
          <Link
            to="#"
            onClick={hideMaturityIntervals}
          >
            <Icon className="fas fa-info-circle" />
          </Link>
          {" "}
          {titleize(copy.maturityInterval.title)}
          {" "}
          <Link
            to="#"
            className={showMaturityIntervalForm ? "fas fa-minus" : "fas fa-plus"}
            onClick={toggleForm}
          />
          <NewMaturityInterval
            id={id}
            apiKey={apiKey}
            dispatch={dispatch}
            newMaturityIntervalAttributes={newMaturityIntervalAttributes}
            showMaturityIntervalForm={showMaturityIntervalForm}
          />
        </div>
        {groupedIntervals.map(intervalsByYear =>
          <MaturityIntervalByYear
            key={intervalsByYear.year}
            apiKey={apiKey}
            dispatch={dispatch}
            {...intervalsByYear}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

const MaturityIntervalByYear = ({ apiKey, collection, dispatch, year }) => (
  <div>
    <strong>{year}</strong>
    <div>
      {collection.map(interval =>
        <Show
          key={interval.id}
          apiKey={apiKey}
          dispatch={dispatch}
          {...interval}
        />
      )}
    </div>
  </div>
)

const mapStateToProps = ((state, ownProps) => {
  const filterFn = (interval) => interval.category_id === ownProps.id
  const sortFn = (a, b) => {
    if (a.year < b.year) {
      return -1
    } else if (a.year > b.year) {
      return 1
    } else if (a.month < b.month) {
      return -1
    } else if (a.month > b.month) {
      return 1
    } else {
      return 0
    }
  }

  const maturityIntervals = state.budget.maturityIntervals
    .filter(filterFn)
    .sort(sortFn)
  const { apiKey } = state.apiKey
  const apiErrorPresent = state.messages.errors.api.length > 0

  return {
    apiErrorPresent: apiErrorPresent,
    apiKey: apiKey,
    ...ownProps,
    maturityIntervals: maturityIntervals,
  }
})

export default connect(mapStateToProps)(MaturityInfo)
