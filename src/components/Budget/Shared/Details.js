import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import MoneyFormatter from "../../../functions/MoneyFormatter"

const {
  budgeted,
  perDay,
  perWeek,
} = copy.item

const {
  remaining,
} = copy.shared

export default (props) => (
  <div className="per-details">
    <div className="detail-group">
      <div className="title">{titleize(budgeted)}</div>
      <div className="per-detail">
        <div className="description">
          {titleize(perDay)}:
        </div>
        <div className="amount">
          {MoneyFormatter(props.budgetedPerDay, { absolute: true })}
        </div>
      </div>
      <div className="per-detail">
        <div className="description">
          {titleize(perWeek)}:
        </div>
        <div className="amount">
          {MoneyFormatter(props.budgetedPerWeek, { absolute: true })}
        </div>
      </div>
    </div>
    <div className="detail-group">
      <div className="title">{titleize(remaining)}</div>
      <div className="per-detail">
        <div className="description">
          {titleize(perDay)}:
        </div>
        <div className="amount">
          {MoneyFormatter(props.remainingPerDay, { absolute: true })}
        </div>
      </div>
      <div className="per-detail">
        <div className="description">
          {titleize(perWeek)}:
        </div>
        <div className="amount">
          {MoneyFormatter(props.remainingPerWeek, { absolute: true })}
        </div>
      </div>
    </div>
  </div>
)
