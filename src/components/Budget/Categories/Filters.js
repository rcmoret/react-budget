import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { applyFilter } from "../../../actions/budget/categories"

import Icon from "../../Icons/Icon"

const Filters = (props) => {
  const {
    all,
    expenses,
    filters,
    frequency,
    monthly,
    revenues,
    searchLabelText,
    searchPlaceholder,
    type,
    weekly,
  } = copy.category

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
        <strong>{titleize(filters)}</strong>
      </div>

      <div className="search">
        <div className="label">
          {titleize(searchLabelText)}
        </div>
        <div className="search-bar">
          <input
            type="text"
            onChange={setSearchTerm}
            placeholder={searchPlaceholder}
            value={searchFilter.value}
          />
        </div>
      </div>

      <div className="adverb">
        <div className="options">
          <div className="title">
            <strong>{titleize(frequency)}</strong>
          </div>
          <hr/>

          <div className="option">
            <div className="label">
              {titleize(all)}
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
              {titleize(weekly)}
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
              {titleize(monthly)}
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
            <strong>{titleize(type)}</strong>
          </div>
          <hr/>

          <div className="option">
            <div className="label">
              {titleize(all)}
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
              {titleize(revenues)}
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
              {titleize(expenses)}
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
