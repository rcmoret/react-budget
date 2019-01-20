import React from "react"
import Icon from "../../Icons/Icon"

const CheckNumber = (props) => (
  <div className="check-number">
    <Icon className="fas fa-money-check" />&nbsp;
    <input
     type="text"
     name="check_number"
     value={props.check_number}
     onChange={props.updateTransaction}
     placeholder="check #"
    />
  </div>
)

export default CheckNumber
