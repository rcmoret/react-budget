import React from "react"
import MonthlyAmount from "./MonthlyAmount"
import Icon from "../../Icons/Icon"

export default (props) => (
  <div className='budget-item'>
    <div className="budget-item-detail">
      <div className='budget-item-description'>
        <div className="caret">
          <Icon className="fas fa-caret-right" />
        </div>
        {props.name}
        {" "}
        <Icon className={props.icon_class_name} />
      </div>
      <div className='budget-item-amount'>
        <MonthlyAmount
          absolute={true}
          {...props}
          remaining={props.amount}
        />
      </div>
    </div>
  </div>
)
