import React from "react"

import { budget as copy } from "../../../../locales/copy"
import {
  removeMaturityInterval,
  toggleMaturityIntervalEditForm,
} from "../../../../actions/budget/categories"
import * as DateFunctions from "../../../../functions/DateFormatter"
import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import EventMessageBuilder from "../../../../functions/EventMessageBuilder"
import { deleteRequest } from "../../../../functions/ApiClient"

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
    const url = ApiUrlBuilder({
      route: "budget-category-maturity-interval-show",
      id: id,
      budgetCategoryId: category_id,
    })
    const action = removeMaturityInterval({ id: id })
    const event = EventMessageBuilder({
      eventType: "budget-category-maturity-interval-delete",
      id: id,
      categoryId: category_id,
      month: month,
      year: year
    })
    deleteRequest(url, event, () => dispatch(action))
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
