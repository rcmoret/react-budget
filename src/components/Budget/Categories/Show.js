import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import * as DateFormatter from "../../../functions/DateFormatter"
import FindOrDefault from "../../../functions/FindOrDefault"
import { get } from "../../../functions/ApiClient"
import { budget as copy, terms } from "../../../locales/copy"
import MoneyFormatter from "../../../functions/MoneyFormatter"
import { titleize } from "../../../locales/functions"

import { categoriesFetched as fetched } from "../../../actions/budget/categories"

const budgetCategoryDataFetched = payload => (
  { type: "budget/categories/show/DATA_FETCHED", payload: payload }
)

const Show = (props) => {
  const {
    categoriesFetched,
    dispatch,
    dataCachedAt,
    dateRange,
    isApiUnauthorized,
    isCacheValid,
    selectedCategoryId,
    selectedCategory,
    transactionsAndEvents,
  } = props

  const { combinedEvents, viewingInterals } = copy.category
  const beginningMonth = DateFormatter.formatted({
    month: dateRange.beginning_month,
    year: dateRange.beginning_year,
    format: "numericMonthYear"
  })

  const endingMonth = DateFormatter.formatted({
    month: dateRange.ending_month,
    year: dateRange.ending_year,
    format: "numericMonthYear"
  })

  if (!isApiUnauthorized && !categoriesFetched) {
    const url = ApiUrlBuilder({ route: "budget-categories-index" })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
    return (<Spinner />)
  } else if ((!dataCachedAt || !isCacheValid) && !isApiUnauthorized) {
    const url = ApiUrlBuilder({ route: "budget-category-show-data", id: selectedCategoryId })
    const onSuccess = data => dispatch(budgetCategoryDataFetched(data))
    get(url, data => onSuccess(data))
    return (<Spinner />)
  } else {
    return (
      <div className="budget-category-events">
        <h2>{selectedCategory.name}</h2>
        <div>
          <strong>{combinedEvents}</strong>
        </div>
        {viewingInterals(beginningMonth, endingMonth)}
        {transactionsAndEvents.map((event, index) => (
          <Event key={index} {...event} />
        ))}
      </div>
    )
  }
}

const Event = props => {
  if (props.hasOwnProperty("transaction_entry_id")) {
    return (<TransactionEvent {...props} />)
  } else {
    return (<BudgetItemEvent {...props} />)
  }
}

const TransactionEvent = props => (
  <div className="budget-category-event">
    <div className="budget-category-event-date">
      {DateFormatter.fromDateString(props.created_at)}
    </div>
    <div className="budget-category-event-type">
      {titleize(terms.transaction)}
    </div>
    <div className="budget-category-event-amount">
      {MoneyFormatter(props.amount)}
    </div>
    <div className="budget-category-event-cell">
      {props.description}
      {" "}
      <span className="italic small">
        (
        {" "}
        {props.account_name}
        {" "}
        {terms.item} {terms.id}:
        {" "}
        {props.budget_item_id}
        {" "}
        )
      </span>
    </div>
  </div>
)

const BudgetItemEvent = props => (
  <div className="budget-category-event">
    <div className="budget-category-event-date">
      {DateFormatter.fromDateString(props.created_at)}
    </div>
    <div className="budget-category-event-type">
      {copy.eventLabels[props.name]}
    </div>
    <div className="budget-category-event-amount">
      {MoneyFormatter(props.amount)}
    </div>
    <div className="budget-category-event-cell">
      {terms.month}:
      {" "}
      {DateFormatter.formatted({ ...props, format: "numericMonthYear" })}
      {" "}
      <span className="italic small">
        (
        {" "}
        {terms.item} {terms.id}:
        {" "}
        {props.budget_item_id}
        {" "}
        )
      </span>
    </div>
  </div>
)

const Spinner = () => (
  <div className="budget-category">
    <h3><i className="fas fa-spinner fa-spin" /></h3>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params
  const categories = state.budget.categories.collection
  const stateCategory = state.budget.categories.show
  const { dataCachedAt, dateRange } = stateCategory
  const category = FindOrDefault(categories, cat => cat.slug === slug, stateCategory)
  const isApiUnauthorized = state.api.status === 401
  const categoriesFetched = state.budget.categories.fetched
  const isCacheValid = slug === stateCategory.slug

  const sortFn = (a, b) => b.created_at < a.created_at ? 1 : -1
  const transactionsAndEvents = [...stateCategory.events, ...stateCategory.transactions].sort(sortFn)

  return {
    categoriesFetched: categoriesFetched,
    dataCachedAt: dataCachedAt,
    dateRange: dateRange,
    isApiUnauthorized: isApiUnauthorized,
    isCacheValid: isCacheValid,
    selectedCategoryId: category.id,
    selectedCategory: category,
    slug: slug,
    transactionsAndEvents: transactionsAndEvents,
  }
}

export default connect(mapStateToProps)(Show)
