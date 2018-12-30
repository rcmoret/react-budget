import React, { Component } from 'react';
import BudgetCategory from './Category';

class BudgetCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentWillMount() {
    fetch('http://192.168.1.81:8088/budget/categories')
      .then(response => response.json())
      .then(data => this.setState({
        categories: data
      })
     )
  }

  render() {
    return (
      <div>
        <h2>Budget Categories</h2>
        <div className="budget-category">
          <strong>Name </strong>
          <span>Default Amount</span>
        </div>
        {this.state.categories.map((category) =>
          <BudgetCategory
            key={category.id}
            {...category}
           />
         )}
        <div className="budget-category">

        </div>
      </div>
    )
  }
}

export default BudgetCategories;
