import React from "react"

import { budget as copy } from "../../../../locales/copy"
import {
  removeMaturityInterval,
  toggleMaturityIntervalEditForm,
} from "../../../../actions/budget/categories"
import * as DateFunctions from "../../../../functions/DateFormatter"
import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"

import Edit from "./Edit"
import { Link } from "react-router-dom"

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
    const { deleteConfirmMessage } = copy.maturityInterval
    const confirmation = window.confirm(deleteConfirmMessage)
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
        <span className="icon-links">
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
