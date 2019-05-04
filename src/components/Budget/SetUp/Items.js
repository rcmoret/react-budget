import React from "react"

import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

import Discretionary from "./Discretionary"

export default ({ collection, discretionary, dispatch, isReady, monthString }) => {
  if (isReady) {
    return (
      <div className="new-month-items">
        <h4>{monthString} Items</h4>
        {collection.map(item =>
          <Item
            key={item.id}
            dispatch={dispatch}
            {...item}
          />
        )}
        <Discretionary
          amount={discretionary}
        />
      </div>
    )
  } else {
    return null
  }
}

const Item = ({ dispatch, name, amount }) => {
  return (
    <div className="new-month-item">
      <div className="name">
        {name}
      </div>
      <div className="amount">
        {MoneyFormatter(amount, { absolute: false })}
      </div>
    </div>
  )
}
