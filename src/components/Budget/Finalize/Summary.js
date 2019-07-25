import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ extra }) => {
  const collection = extra.filter(item => item.amount !== 0)
  const total = collection.reduce((acc, item) => { return acc + item.amount }, 0)
  return (
    <div className="finalize-summary">
      <h2>{titleize(copy.finalize.summary)}</h2>
      <div className="extra">
        <span>{titleize(copy.finalize.extra)}: </span>
        <span>{MoneyFormatter(total, { absolute: true })} </span>
      </div>
      {collection.map(item =>
        <ExtraItem
          {...item}
        />
      )}
    </div>
  )
}

const ExtraItem = ({ name, amount }) => (
  <div className="extra">
    <span>{name}</span>
    <span>{MoneyFormatter(amount, { absolute: true })}</span>
  </div>
)
