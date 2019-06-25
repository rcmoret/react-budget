import React from "react"

import * as DateFunctions from "../../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../../shared/Functions/ApiUrlBuilder"
import { Link } from "react-router-dom"
import {
  removeMaturityInterval,
  toggleMaturityIntervalEditForm,
} from "../../../../actions/budget/categories"

import Edit from "./Edit"

export default (props) => {
  const {
    id,
    category_id,
    dispatch,
    month,
    showForm,
    year,
  } = props

  const revealForm = () => {
    const action = toggleMaturityIntervalEditForm({
      id: id,
      showForm: true,
    })
    dispatch(action)
  }

  const deleteMaturityInterval = () => {
    const confirmation = window.confirm("Delete this maturity interval?")
    if (!confirmation) { return }
    const url = ApiUrlBuilder(["budget/categories", category_id, "maturity_intervals", id])
    const action = removeMaturityInterval({ id: id })
    fetch(url, { method: "delete" })
      .then(() => dispatch(action))
  }

  if (!showForm) {
    return (
      <div className="maturity-interval">
        {DateFunctions.formatted({ month: month, year: year, day: 1, format: "longMonth" })}
        <span>
          {" "}
          <Link
            to="#"
            className="far fa-edit"
            onClick={revealForm}
          />
          {" "}
          <Link
            to="#"
            className="far fa-trash-alt"
            onClick={deleteMaturityInterval}
          />
        </span>
      </div>
    )
  } else {
    return (
      <Edit
        {...props}
      />
    )
  }
}

