import React from "react"

import { Link } from "react-router-dom"
import Select from "react-select"

export default (props) => {
  const {
    cancel,
    maturityInterval,
    options,
    onChange,
    onSubmit
  } = props

  const handleSelect = (e) => {
    onChange({ month: e.value })
  }

  const handleYear = (e) => {
    onChange({ year: e.target.value })
  }

  return (
    <div className="new-maturity-interval">
      <div className="month-select">
        <Select
          options={options}
          onChange={handleSelect}
        />
      </div>
      <div className="year-input">
        <input
          type="number"
          value={maturityInterval.year}
          onChange={handleYear}
          placeholder="year"
        />
      </div>
      <div className="maturity-interval-submit">
        <Link
          to="#"
          className="fas fa-check"
          onClick={onSubmit}
        />
      </div>
      <div className="maturity-interval-submit">
        <Link
          to="#"
          className="fas fa-times"
          onClick={cancel}
        />
      </div>
    </div>
  )

}
