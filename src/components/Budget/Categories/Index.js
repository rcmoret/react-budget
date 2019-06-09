import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { categoriesFetched } from "../../../actions/budget"
import { fetched as iconsFetched } from "../../../actions/icons"

import Filters from "./Filters"
import Header from "./Header"
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

  if (fetched && !props.iconsFetched) {
    const url = ApiUrlBuilder(["icons"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(iconsFetched(data)))
  }

  return (
    <div className="categories">
      <h2>Budget Categories</h2>
      <Header />
      <Filters />
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
  const { collection, fetched, filters } = state.budget.categories
  const adjectiveFilter = (category) => {
    const filter = filters.find(filter => filter.name === "adjective")
    switch (filter.value) {
    case "expense":
      return category.expense
    case "revenue":
      return !category.expense
    default:
      return true
    }
  }
  const adverbFilter = (category) => {
    const filter = filters.find(filter => filter.name === "adverb")
    switch (filter.value) {
    case "day-to-day":
      return !category.monthly
    case "monthly":
      return category.monthly
    default:
      return true
    }
  }
  const searchTerm = filters.find(filter => filter.name === "search").value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const searchFilter = (category) => {
    if (searchTerm === "") {
      return true
    } else {
      const expression = new RegExp(searchTerm, "i")
      return category.name.match(expression)
    }
  }
  const sortBy = (a, b) => {
    if (searchTerm === "") { return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 }
    const strictExp = new RegExp(`^${searchTerm}.*`, "i")
    const looseExp = new RegExp(`(^|\\s)${searchTerm}.*`, "i")
    if (a.name.match(strictExp) && b.name.match(strictExp)) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    } else if (a.name.match(strictExp)) {
      return -1
    } else if (b.name.match(strictExp)) {
      return 1
    } else if (a.name.match(looseExp) && b.name.match(looseExp)) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    } else if (a.name.match(looseExp)) {
      return -1
    } else if (b.name.match(looseExp)) {
      return 1
    } else {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    }
  }
  const iconsFetched = state.icons.fetched
  const categories = collection
    .filter(adjectiveFilter)
    .filter(adverbFilter)
    .filter(searchFilter)
    .sort(sortBy)

  return {
    collection: categories,
    fetched: fetched,
    iconsFetched: iconsFetched,
  }
}

export default connect(mapStateToProps)(BudgetCategories)
