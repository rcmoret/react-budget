import React from "react"
import { connect } from "react-redux"

import { applyFilter } from "../../../actions/budget/categories"
import Icon from "../../Icons/Icon"

const Filters = (props) => {
  const {
    adjectiveFilter,
    adverbFilter,
    appliedFilters,
    dispatch,
    searchFilter,
  } = props

  const funnelClass = appliedFilters.length === 0 ? "" : "active"

  const setFilter = (name, value) => dispatch(
    applyFilter({ name: name, value: value })
  )

  const setSearchTerm = (e) => {
    setFilter("search", e.target.value)
  }

  const setAdjectiveFilter = (e) => {
    setFilter("adjective", e.target.value)
  }

  const setAdverbFilter = (e) => {
    setFilter("adverb", e.target.value)
  }

  return (
    <div className="budget-category-filters">
      <span className={funnelClass}>
        <Icon className="fas fa-filter" />
      </span>
      {" "}
      <div className="title">
        <strong>Filters</strong>
      </div>

      <div className="search">
        <div className="label">
          Category Name
        </div>
        <div className="search-bar">
          <input
            type="text"
            onChange={setSearchTerm}
            placeholder="search"
            value={searchFilter.value}
          />
        </div>
      </div>

      <div className="adverb">
        <div className="options">
          <div className="title">
            <strong>Frequency</strong>
          </div>
          <hr/>

          <div className="option">
            <div className="label">
              ALL
            </div>
            <div className="radio">
              <input
                type="radio"
                onChange={setAdverbFilter}
                value=""
                checked={adverbFilter.value === "" ? "checked" : ""}
              />
            </div>
          </div>

          <div className="option">
            <div className="label">
              Day-to-Day
            </div>
            <div className="radio">
              <input
                type="radio"
                onChange={setAdverbFilter}
                value="day-to-day"
                checked={adverbFilter.value === "day-to-day" ? "checked" : ""}
              />
            </div>
          </div>

          <div className="option">
            <div className="label">
              Monthly
            </div>
            <div className="radio">
              <input
                type="radio"
                onChange={setAdverbFilter}
                value="monthly"
                checked={adverbFilter.value === "monthly" ? "checked" : ""}
              />
            </div>
          </div>

        </div>
      </div>

      <div className="adjective">
        <div className="options">
          <div className="title">
            <strong>Type</strong>
          </div>
          <hr/>

          <div className="option">
            <div className="label">
              ALL
            </div>
            <div className="radio">
              <input
                type="radio"
                onChange={setAdjectiveFilter}
                value=""
                checked={adjectiveFilter.value === "" ? "checked" : ""}
              />
            </div>
          </div>

          <div className="option">
            <div className="label">
              Revenues
            </div>
            <div className="radio">
              <input
                type="radio"
                onChange={setAdjectiveFilter}
                value="revenue"
                checked={adjectiveFilter.value === "revenue" ? "checked" : ""}
              />
            </div>
          </div>

          <div className="option">
            <div className="label">
              Expenses
            </div>
            <div className="radio">
              <input
                type="radio"
                onChange={setAdjectiveFilter}
                value="expense"
                checked={adjectiveFilter.value === "expense" ? "checked" : ""}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    filters,
    showFilters,
  } = state.budget.categories
  const appliedFilters = filters.filter(filter => filter.value !== "")
  const adjectiveFilter = filters.find(filter => filter.name === "adjective")
  const adverbFilter = filters.find(filter => filter.name === "adverb")
  const searchFilter = filters.find(filter => filter.name === "search")

  return {
    adjectiveFilter: adjectiveFilter,
    adverbFilter: adverbFilter,
    appliedFilters: appliedFilters,
    searchFilter: searchFilter,
    showFilters: showFilters
  }
}

export default connect(mapStateToProps)(Filters)
