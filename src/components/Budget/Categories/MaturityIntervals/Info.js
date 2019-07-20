import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import * as DateFunctions from "../../../../functions/DateFormatter"
import GroupBy from "../../../../functions/GroupBy"
import { Link } from "react-router-dom"
import {
  accrualMaturityIntervalsFetched,
  updated
} from "../../../../actions/budget/categories"

import Icon from "../../../Icons/Icon"
import NewMaturityInterval from "./New"
import Show from "./Show"

const MaturityInfo = (props) => {
  const {
    id,
    accrual,
    dispatch,
    maturityIntervals,
    maturityIntervalsFetched,
    newMaturityIntervalAttributes,
    showMaturityIntervalForm,
    showMaturityIntervals,
  } = props

  if (!maturityIntervalsFetched && showMaturityIntervals) {
    const url = ApiUrlBuilder(["budget/categories", id, "maturity_intervals"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(accrualMaturityIntervalsFetched({
        id: id,
        collection: data,
      })))
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
          Maturity Intervals
          {" "}
          <Link
            to="#"
            className={showMaturityIntervalForm ? "fas fa-minus" : "fas fa-plus"}
            onClick={toggleForm}
          />
          <NewMaturityInterval
            id={id}
            dispatch={dispatch}
            newMaturityIntervalAttributes={newMaturityIntervalAttributes}
            showMaturityIntervalForm={showMaturityIntervalForm}
          />
        </div>
        {groupedIntervals.map(intervalsByYear =>
          <MaturityIntervalByYear
            key={intervalsByYear.year}
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

const MaturityIntervalByYear = ({ collection, dispatch, year }) => (
  <div>
    <strong>{year}</strong>
    <div>
      {collection.map(interval =>
        <Show
          key={interval.id}
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

  return {
    ...ownProps,
    maturityIntervals: maturityIntervals,
  }
})

export default connect(mapStateToProps)(MaturityInfo)

