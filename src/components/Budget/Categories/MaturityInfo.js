import React from "react"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { formatted } from "../../../shared/Functions/DateFormatter"
import GroupBy from "../../../shared/Functions/GroupBy"
import { Link } from "react-router-dom"
import { updated } from "../../../actions/budget/categories"

import Icon from "../../Icons/Icon"

export default (props) => {
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
      .then(data => dispatch(updated({ id: id, maturityIntervals: data, maturityIntervalsFetched: true })))
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
          <MaturityIntervalByYear key={intervalsByYear.year} {...intervalsByYear} />
        )}
      </div>
    )
  } else {
    return null
  }
}

const MaturityIntervalByYear = ({ collection, year }) => (
  <div>
    <strong>{year}</strong>
    <div>
      {collection.map(interval =>
        <MaturityInterval key={interval.id} {...interval} />
      )}
    </div>
  </div>
)

const MaturityInterval = ({ month, year }) => (
  <div className="maturity-interval">
    {formatted({ month: month, year: year, day: 1, format: "longMonth" })}
  </div>
)
