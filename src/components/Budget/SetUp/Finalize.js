import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { updateMetadata } from "../../../actions/budget/setup"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import { put } from "../../../functions/ApiClient"

import Icon from "../../Icons/Icon"
import Items from "./Items"
import { Redirect } from "react-router-dom"

const Finalize = ({ dispatch, month, setUpCompletedAt, year }) => {
  const { markCompleteText } = copy.setup

  const markComplete = (e) => {
    e.preventDefault()
    const url = ApiUrlBuilder({ route: "interval-show", month: month, year: year })
    const body = { set_up_completed_at: new Date() }
    const onSuccess = data => dispatch(updateMetadata(data))
    const event = EventMessageBuilder({
      eventType: "interval-mark-complete",
      month: month,
      year: year,
      ...body
    })
    put(url, JSON.stringify(body), { onSuccess: onSuccess, events: [event] })
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
                  <strong>{titleize(markCompleteText)}</strong>
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
