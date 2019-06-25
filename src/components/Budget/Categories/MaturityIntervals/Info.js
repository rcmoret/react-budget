import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../../shared/Functions/ApiUrlBuilder"
import * as DateFunctions from "../../../../shared/Functions/DateFormatter"
import GroupBy from "../../../../shared/Functions/GroupBy"
import { Link } from "react-router-dom"
import {
  accrualMaturityIntervalsFetched,
  removeMaturityInterval,
  updated
} from "../../../../actions/budget/categories"

import Icon from "../../../Icons/Icon"
import NewMaturityInterval from "./New"

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
        <MaturityInterval
          key={interval.id}
          dispatch={dispatch}
          {...interval}
        />
      )}
    </div>
  </div>
)

const MaturityInterval = ({ id, category_id,  dispatch, month, year }) => {
  const deleteMaturityInterval = () => {
    const confirmation = window.confirm("Delete this maturity interval?")
    if (!confirmation) { return }
    const url = ApiUrlBuilder(["budget/categories", category_id, "maturity_intervals", id])
    const action = removeMaturityInterval({ id: id })
    fetch(url, { method: "delete" })
      .then(() => dispatch(action))
  }

  return (
    <div className="maturity-interval">
      {DateFunctions.formatted({ month: month, year: year, day: 1, format: "longMonth" })}
      <span>
        {" "}
        <Link
          to="#"
          className="far fa-trash-alt"
          onClick={deleteMaturityInterval}
        />
      </span>
    </div>
  )
}

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

