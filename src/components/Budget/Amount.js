import React from 'react';
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const Amount = (props) => {
  if (props.showDetail) {
    return (
      <span>
        {MoneyFormatter(props.amount, { absolute: props.absolute })}
      </span>
    )
  } else {
    return (
      <span>
        {MoneyFormatter(props.remaining, { absolute: props.absolute })}
      </span>
    )
  }
}

export default Amount;
