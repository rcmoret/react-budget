import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../Icons/Icon'

const SubtransactionsButton = (props) => {
  if (props.subtransactions.length === 0) {
    return (
      <div className="add-subtransactions">
        <Link to="#" onClick={props.addSubtransactions}>
          <Icon className="fas fa-plus-circle" />&nbsp;
          Add Subtransactions
        </Link>
      </div>
    )
  } else {
    return (
      <div className="add-subtransactions">
        <Link to="#" onClick={props.addSubtransaction}>
          <Icon className="fas fa-plus-circle" />&nbsp;
          Add Subtransaction
        </Link>
      </div>
    )
  }
}

export default SubtransactionsButton;
