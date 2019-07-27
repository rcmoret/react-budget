import React from 'react'

import { transaction as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

const {
  account,
  amount,
  date,
  description,
} = copy

export default () => (
  <div className="budget-item-transaction-row">
    <div className="budget-transaction-cell">
      {titleize(date)}
    </div>
    <div className="budget-transaction-cell">
      {titleize(account)}
    </div>
    <div className="budget-transaction-cell">
      {titleize(description)}
    </div>
    <div className="budget-transaction-cell">
      {titleize(amount)}
    </div>
  </div>
)
