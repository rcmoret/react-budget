import React from 'react'
import { Link } from 'react-router-dom'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const AmountContainer = (props) => {
  const { absolute, amount, remaining, showDetail, updateItem } = props
  if (showDetail) {
    return (
      <span>
        <Link to="#" onClick={updateItem}>
          {MoneyFormatter(amount, { absolute: absolute })}
        </Link>
      </span>
    )
  } else {
    return (
      <span>
        <Link to="#" onClick={updateItem}>
          {MoneyFormatter(remaining, { absolute: absolute })}
        </Link>
      </span>
    )
  }
}

export default AmountContainer
