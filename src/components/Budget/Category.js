import React, { Component } from 'react';

class BudgetCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  render() {
    return (
      <div className="budget-category">
        <strong>{this.state.name}</strong>
        <span>${parseFloat(this.state.default_amount / 100.0).toFixed(2)}</span>
      </div>
    )
  }
}

export default BudgetCategory;
