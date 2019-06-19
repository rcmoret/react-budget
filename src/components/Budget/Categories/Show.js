import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { deleted, update, updated } from "../../../actions/budget/categories"
import { formatted } from "../../../shared/Functions/DateFormatter"
import GroupBy from "../../../shared/Functions/GroupBy"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import Edit from "./Edit"
import Icon from "../../Icons/Icon"

const Show = (props) => {
  const {
    category,
    dispatch,
  } = props

  const {
    id,
    accrual,
    default_amount,
    expense,
    icon_class_name,
    maturityIntervals,
    maturityIntervalsFetched,
    monthly,
    name,
    showForm,
    showMaturityIntervals,
  } = category

  const revealForm = (e) => {
    e.preventDefault()
    const action = update({ id: id, showForm: true })
    dispatch(action)
  }

  const deleteCategory = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(`Are you sure you want to delete ${name}?`)
    if (confirmation) {
      const url = ApiUrlBuilder(["budget", "categories", id])
      fetch(url, { method: "delete" })
        .then(() => dispatch(deleted(id)))
    } else {
      return
    }
  }

  if (showForm) {
    return (
      <Edit
        category={category}
      />
    )
  } else {
    return (
      <div className="budget-category">
        <div className="category-name">{name}</div>
        <div className="category-default-amount">
          {MoneyFormatter(default_amount, { absoulte: false })}
        </div>
        <div className="category-detail">
          {monthly ? "monthly" : "day-to-day"}
          {" "}
          {expense ? "expense" : "revenue"}
        </div>
        <div className="category-icon">
          {accrual ? "accrual" : ""}
        </div>
        <div className="category-icon">
          <Icon className={icon_class_name} />
        </div>
        <div className="category-edit">
          <Link
            to="#"
            onClick={revealForm}
            className="far fa-edit"
          />
        </div>
        <div className="category-delete">
          <Link
            to="#"
            onClick={deleteCategory}
            className="far fa-trash-alt"
          />
        </div>
        <ExtraInfo
          id={id}
          accrual={accrual}
          dispatch={dispatch}
          maturityIntervals={maturityIntervals}
          maturityIntervalsFetched={maturityIntervalsFetched}
          showMaturityIntervals={showMaturityIntervals}
        />
      </div>
    )
  }
}


const ExtraInfo = (props) => {
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

export default connect((_state, ownProps) => ownProps)(Show)
