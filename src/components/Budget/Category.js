import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icons/Icon';

class BudgetCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="budget-category">
        <div className="category-name">{this.state.name}</div>
        <div className="category-default-amount">
          ${parseFloat(this.state.default_amount / 100.0).toFixed(2)}
        </div>
        <div className="category-detail">
          {this.state.monthly ? "monthly" : "weekly"}
          &nbsp;
          {this.state.expense ? "expense" : "revenue"}
        </div>
        <div className="category-icon">
          <Icon className={this.state.icon_class_name} />
        </div>
        <div className="category-edit">
          <Link to="#" className="far fa-edit"/>
        </div>
      </div>
    )
  }
}

export default BudgetCategory;
