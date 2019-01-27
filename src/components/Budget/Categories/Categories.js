import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { categoriesFetched } from "../../../actions/budget"
import BudgetCategory from "./Category"
import Header from "./Header"
import NewBudgetCategory from "./NewCategory"

class BudgetCategories extends Component {
  componentWillMount() {
    const url = ApiUrlBuilder(['budget', 'categories'])
    fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(categoriesFetched(data)))
  }

  render() {
    const { collection } = this.props
    return (
      <div className="categories">
        <h2>Budget Categories</h2>
        <Header />
        {collection.map((category) =>
          <BudgetCategory
            key={category.id}
            {...category}
           />
         )}
        <div className="budget-category">
          <NewBudgetCategory />
        </div>
      </div>
    )
  }
}

BudgetCategories.defaultProps = {
  categories: [],
}

export default connect(state => state.budget.categories)(BudgetCategories)
