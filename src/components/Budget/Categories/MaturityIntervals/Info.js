import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../../shared/Functions/ApiUrlBuilder"
import * as DateFunctions from "../../../../shared/Functions/DateFormatter"
import GroupBy from "../../../../shared/Functions/GroupBy"
import { Link } from "react-router-dom"
import {
  accrualMaturityIntervalsFetched,
  maturityIntervalCreated,
  removeMaturityInterval,
  updated
} from "../../../../actions/budget/categories"

import Form from "./Form"
import Icon from "../../../Icons/Icon"

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
    const action = updated({ id: id, maturityIntervalsFetched: true })
    dispatch(action)
    const url = ApiUrlBuilder(["budget/categories", id, "maturity_intervals"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(accrualMaturityIntervalsFetched({ id: id, collection: data })))
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

const NewMaturityInterval = (props) => {
  const {
    id,
    dispatch,
    newMaturityIntervalAttributes,
    showMaturityIntervalForm,
  } = props

  const maturityInterval = newMaturityIntervalAttributes || {}

  const updateNewMaturityInterval = (payload) => {
    const action = updated({
      id: id,
      newMaturityIntervalAttributes: { ...newMaturityIntervalAttributes, ...payload }
    })
    dispatch(action)
  }

  const hideForm = (e) => {
    const action = updated({ id: id, showMaturityIntervalForm: false })
    dispatch(action)
  }

  const options = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ]

  const addMaturityInterval = () => {
    const url = ApiUrlBuilder(["budget/categories", id, "maturity_intervals"])
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMaturityIntervalAttributes)
    })
      .then(response => response.json())
      .then(data => dispatch(maturityIntervalCreated({
        id: id,
        maturityInterval: data
      })))
  }

  const onChange = (payload) => {
    updateNewMaturityInterval(payload)
  }

  if (showMaturityIntervalForm) {
    return (
      <Form
        cancel={hideForm}
        maturityInterval={maturityInterval}
        onChange={onChange}
        onSubmit={addMaturityInterval}
        options={options}
      />
    )
  } else {
    return null
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

