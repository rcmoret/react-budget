import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../Icons/Icon';

const BudgetCategory = (props) => (
  <div className="budget-category">
    <div className="category-name">{props.name}</div>
    <div className="category-default-amount">
      ${parseFloat(props.default_amount / 100.0).toFixed(2)}
    </div>
    <div className="category-detail">
      {props.monthly ? "monthly" : "weekly"}
      &nbsp;
      {props.expense ? "expense" : "revenue"}
    </div>
    <div className="category-icon">
      <Icon className={props.icon_class_name} />
    </div>
    <div className="category-edit">
      <Link to="#" className="far fa-edit"/>
    </div>
  </div>
)

export default BudgetCategory;
