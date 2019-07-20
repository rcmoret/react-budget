import React from "react"
import { connect } from "react-redux"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { formatted, fromDateString, fromDateTimeObject } from "../../../functions/DateFormatter"

const ClearanceDate = ({ clearanceDate, handleKeyDown, month, onChange, year }) => {
  const update = (e) => {
    const val = e === null ? "" : fromDateTimeObject(e.toLocaleString())
    onChange({ clearance_date: val })
  }

  const selected = () => {
    if (clearanceDate) {
      return fromDateString(clearanceDate, { format: "dateObject" })
    } else {
      return ""
    }
  }

  const openToDate = () => {
    if (clearanceDate) {
      return selected()
    } else {
      const today = new Date()
      if ((today.getMonth() + 1) === month && today.getFullYear() === year) {
        return formatted({ month: month, day: today.getDate(), year: year, format: "dateObject" })
      } else {
        if (year > today.getFullYear() || (year === today.getFullYear() && month > (today.getMonth() + 1))) { // future
          return formatted({ month: month, day: 1, year: year, format: "dateObject" })
        } else {
          return formatted({ month: (month + 1), day: 0, year: year, format: "dateObject" })
        }
      }
    }
  }

  const options = {
    openToDate: openToDate(),
    selected: selected(),
  }

  return (
    <div className="clearance-date">
      <DatePicker
        onChange={update}
        {...options}
        placeholderText="clearance date"
        todayButton={"Today"}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { month, year } = state.transactions.metadata.query_options

  return {
    ...ownProps,
    month: parseInt(month),
    year: parseInt(year),
  }
}

export default connect(mapStateToProps)(ClearanceDate)
