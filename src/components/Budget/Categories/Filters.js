import React from "react"
import { connect } from "react-redux"

import { applyFilter, toggleCategoryFilters } from "../../../actions/budget/categories"
import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"

const Filters = ({ adjectiveFilter, adverbFilter, appliedFilters, dispatch, showFilters }) => {
  const funnelClass = appliedFilters.length === 0 ? "" : "active"

  const toggleFilters = (e) => {
    e.preventDefault()
    const action = toggleCategoryFilters({ showFilters: !showFilters })
    dispatch(action)
  }

  const setAdjectiveFilter = (e) => {
    const action = applyFilter({ name: "adjective", value: e.target.value })
    dispatch(action)
  }

  const setAdverbFilter = (e) => {
    const action = applyFilter({ name: "adverb", value: e.target.value })
    dispatch(action)
  }

  if (showFilters) {
    return (
      <div className="budget-category-filters">
        <hr/>
        <Link
          to="#"
          className="fas fa-caret-down"
          onClick={toggleFilters}
        />
        {" "}
        <span className={funnelClass}>
          <Icon className="fas fa-filter" />
        </span>
        {" "}
        <div className="title">
          <strong>Filters</strong>
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
        <hr/>
      </div>
    )
  } else {
    return (
      <div className="budget-category-filters">
        <hr/>
        <Link
          to="#"
          className="fas fa-caret-right"
          onClick={toggleFilters}
        />
        {" "}
        <span className={funnelClass}>
          <Icon className="fas fa-filter" />
        </span>
        <hr/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    filters,
    showFilters,
  } = state.budget.categories
  const appliedFilters = filters.filter(filter => filter.value !== "")
  const adjectiveFilter = filters.find(filter => filter.name === "adjective")
  const adverbFilter = filters.find(filter => filter.name === "adverb")

  return {
    adjectiveFilter: adjectiveFilter,
    adverbFilter: adverbFilter,
    appliedFilters: appliedFilters,
    showFilters: showFilters
  }
}

export default connect(mapStateToProps)(Filters)
