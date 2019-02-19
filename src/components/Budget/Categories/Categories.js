import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { categoriesFetched } from "../../../actions/budget"
import { iconsFetched } from "../../../actions/icons"
import BudgetCategory from "./Category"
import Header from "./Header"
import NewBudgetCategory from "./NewCategory"

class BudgetCategories extends Component {
  componentWillMount() {
    if (!this.props.fetched) {
      const categoryUrl = ApiUrlBuilder(["budget", "categories"])
      fetch(categoryUrl)
        .then(response => response.json())
        .then(data => this.props.dispatch(categoriesFetched(data)))
    }
    if (!this.props.iconsFetched) {
      const iconsUrl = ApiUrlBuilder(["icons"])
      fetch(iconsUrl)
        .then(response => response.json())
        .then(data => this.props.dispatch(iconsFetched(data)))
    }
  }

  render() {
    const { collection } = this.props
    return (
      <div className="categories">
        <h2>Budget Categories</h2>
        <Header />
        <NewBudgetCategory />
        {collection.map((category) =>
          <BudgetCategory
            key={category.id}
            {...category}
           />
         )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { collection, itemsFetched } = state.budget.categories
  const iconsFetched = state.icons.fetched
  const categories = collection.sort((a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  })
  return {
    collection: categories,
    fetched: itemsFetched,
    iconsFetched: iconsFetched,
  }
}

export default connect(mapStateToProps)(BudgetCategories)
