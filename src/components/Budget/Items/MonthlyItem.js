import React from "react"
import Amount from "./Amount"
import Icon from "../../Icons/Icon"

const MonthlyItem = (props) => {
  return (
    <div className='budget-item'>
      <div className="budget-item-detail">
        <div className='budget-item-description'>
          <div className="caret">
            <Icon className="fas fa-caret-right" />
          </div>
          {props.name}
          &nbsp;
          <Icon className={props.icon_class_name} />
        </div>
        <div className='budget-item-amount'>
          <Amount
           absolute={true}
           {...props}
           remaining={props.amount}
          />
        </div>
      </div>
    </div>
  );
}

export default MonthlyItem;
