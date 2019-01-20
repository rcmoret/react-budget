import React, { Component } from "react";
import BudgetCategory from "./Category";
import Header from "./Header"
import NewBudgetCategory from "./NewCategory";
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"

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
    const { categories } = this.state
    return (
      <div className="categories">
        <h2>Budget Categories</h2>
        <Header />
        {categories.map((category) =>
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
