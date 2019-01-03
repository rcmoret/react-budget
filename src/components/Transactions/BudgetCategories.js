import React, { Component } from 'react';

class BudgetCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtransactions: [],
      ...props,
    }
    this.categories = this.categories.bind(this)
  }

  categories() {
    if (this.state.subtransactions.length > 0) {
      const arr = this.state.subtransactions.map((sub) => sub.budget_category)
      return arr.join(', ')
    } else {
      return this.state.budget_category || ''
    }
  }

  render() {
    if (this.categories().length > 0) {
      return (
        <div className="budget-categories">
          {this.categories()}
        </div>
      )
    } else {
      return null
    }
  }
}

export default BudgetCategories;
