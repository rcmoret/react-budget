import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { Redirect } from "react-router-dom"
import { updateMetadata } from "../../../actions/budget/setup"

import Icon from "../../Icons/Icon"
import Items from "./Items"

const Finalize = ({ dispatch, month, setUpCompletedAt, year }) => {
  const markComplete = (e) => {
    e.preventDefault()
    const url = ApiUrlBuilder(["intervals", month, year])
    const now = new Date()
    const body = JSON.stringify({ set_up_completed_at: now })
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then(response => response.json())
      .then(data => dispatch(updateMetadata(data)))
  }

  if (!setUpCompletedAt) {
    return (
      <div className="set-up-workspace">
        <div className="previous-month-items">
          <div className="review-item-current">
            <div className="review-item-form">
              <div className="confirm-button">
                <button
                  onClick={markComplete}
                >
                  <strong>Mark Setup Complete</strong>
                  {" "}
                  <Icon className="far fa-check-square" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Items />
      </div>
    )
  } else {
    return (
      <Redirect to={`/budget/${month}/${year}`} />
    )
  }
}

const mapStateToProps = (state) => {
  const { newMonth } = state.budget.setup
  const { month, set_up_completed_at, year } = newMonth

  return {
    month: month,
    setUpCompletedAt: set_up_completed_at,
    year: year,
  }
}

export default connect(mapStateToProps)(Finalize)
