import React, { Component } from 'react';
import BudgetCategory from './Category';
import NewBudgetCategory from './NewCategory';
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'

class BudgetCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder(['budget', 'categories']))
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
      <div className="categories">
        <h2>Budget Categories</h2>
        <div className="budget-category-labels">
          <div className="category-name"><h3>Name</h3></div>
          <div className="category-default-amount"><h3>Default Amount</h3></div>
          <div className="category-detail"><h3>Details</h3></div>
          <div className="category-icon"><h3>Icon</h3></div>
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

BudgetCategories.defaultProps = {
  categories: [],
}

export default BudgetCategories;
