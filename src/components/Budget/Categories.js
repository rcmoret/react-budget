import React, { Component } from 'react';
import BudgetCategory from './Category';
import NewBudgetCategory from './NewCategory';
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'

class BudgetCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder('budget', 'categories'))
      .then(response => response.json())
      .then(data => this.setState({
        categories: data
      })
     )
  }

  onSave(category) {
    let { categories } = this.state
    categories.push(category)
    this.setState({ categories: categories })
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
          <NewBudgetCategory onSave={this.onSave} />
        </div>
      </div>
    )
  }
}

export default BudgetCategories;
