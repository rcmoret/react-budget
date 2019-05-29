import React from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { categoriesFetched } from "../../../actions/budget"
import Header from "./Header"
import { fetched as iconsFetched } from "../../../actions/icons"
import NewBudgetCategory from "./New"
import Show from "./Show"

const BudgetCategories = (props) => {
  const { collection, dispatch, fetched } = props

  if (!fetched) {
    const url = ApiUrlBuilder(["budget", "categories"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(categoriesFetched(data)))
  }

  if (!props.iconsFetched) {
    const url = ApiUrlBuilder(["icons"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(iconsFetched(data)))
  }

  return (
    <div className="categories">
      <h2>Budget Categories</h2>
      <Header />
      <NewBudgetCategory />
      {collection.map(category =>
        <Show
          key={category.id}
          category={category}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { collection, fetched } = state.budget.categories
  const iconsFetched = state.icons.fetched
  const categories = collection.sort((a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  })

  return {
    collection: categories,
    fetched: fetched,
    iconsFetched: iconsFetched,
  }
}

export default connect(mapStateToProps)(BudgetCategories)
