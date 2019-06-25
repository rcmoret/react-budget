import React from "react"

import * as DateFunctions from "../../../../shared/Functions/DateFormatter"
import ApiUrlBuilder from "../../../../shared/Functions/ApiUrlBuilder"
import { Link } from "react-router-dom"
import {
  removeMaturityInterval,
} from "../../../../actions/budget/categories"

export default (props) => {
  const {
    id,
    category_id,
    dispatch,
    month,
    year,
  } = props

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
