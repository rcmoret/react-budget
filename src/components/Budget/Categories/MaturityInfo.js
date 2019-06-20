import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import * as DateFunctions from "../../../shared/Functions/DateFormatter"
import GroupBy from "../../../shared/Functions/GroupBy"
import { Link } from "react-router-dom"
import { accrualMaturityIntervalsFetched, removeMaturityInterval, updated } from "../../../actions/budget/categories"

import Icon from "../../Icons/Icon"

const MaturityInfo = (props) => {
  const {
    id,
    accrual,
    dispatch,
    maturityIntervals,
    maturityIntervalsFetched,
    showMaturityIntervals,
  } = props

  if (!maturityIntervalsFetched && showMaturityIntervals) {
    const url = ApiUrlBuilder(["budget/categories", id, "maturity_intervals"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(accrualMaturityIntervalsFetched({ id: id, collection: data })))
  }

  const fetchMaturityIntervals = () => {
    dispatch(updated({ id: id, showMaturityIntervals: true }))
  }

  const hideMaturityIntervals = () => {
    dispatch(updated({ id: id, showMaturityIntervals: false }))
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
  const today = DateFunctions.today("object")
  const prevMonth = year < today.year || (year === today.year && month < today.month)

  return (
    <div className="maturity-interval">
      {DateFunctions.formatted({ month: month, year: year, day: 1, format: "longMonth" })}
      <DeleteButton
        id={id}
        categoryId={category_id}
        dispatch={dispatch}
        prevMonth={prevMonth}
      />
    </div>
  )
}

const DeleteButton = ({ id, categoryId, dispatch, prevMonth }) => {
  const deleteMaturityInterval = () => {
    const url = ApiUrlBuilder(["budget/categories", categoryId, "maturity_intervals", id])
    const action = removeMaturityInterval({ id: id })
    fetch(url, { method: "delete" })
      .then(() => dispatch(action))
  }

  if (prevMonth) {
    return null
  } else {
    return (
      <span>
        {" "}
        <Link
          to="#"
          className="far fa-trash-alt"
          onClick={deleteMaturityInterval}
        />
      </span>
    )
  }
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
