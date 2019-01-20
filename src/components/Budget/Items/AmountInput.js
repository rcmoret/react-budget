import React from 'react'
import { Link } from 'react-router-dom'

const AmountInput = (props) => (
  <span className="update-amount">
    <Link to="#" onClick={props.saveChange} className="fas fa-check" />
    &nbsp;
    <Link to="#" onClick={props.reset} className="fas fa-times" />
    <br/>
    <input
     name="amount"
     value={props.floatAmount}
     onChange={props.handleChange}
     autcomplete="false"
    />
  </span>
)

export default AmountInput
