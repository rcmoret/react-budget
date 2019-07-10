import React from "react"
import { connect } from "react-redux"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import {
  changeItemSortOrder,
  toggleAccrualItems,
  toggleClearedItems,
  toggleMenu,
} from "../../actions/budget"
import SetUpButton from "./SetUpButton"

const Menu = (props) => {
  const {
    dispatch,
    month,
    year,
    isFuture,
    requiresSetUp,
    showAccruals,
    showCleared,
    showOptions,
    sortOrder,
  } = props

  return (
    <nav className="budget-actions">
      <Title
        dispatch={dispatch}
        showOptions={showOptions}
      />
      <Links
        dispatch={dispatch}
        month={month}
        year={year}
        isFuture={isFuture}
        requiresSetUp={requiresSetUp}
        showAccruals={showAccruals}
        showOptions={showOptions}
        showCleared={showCleared}
        sortOrder={sortOrder}
      />
    </nav>
  )
}

const Title = ({ dispatch, showOptions }) => {
  const toggleCaret = (e) => {
    e.preventDefault()
    const action = toggleMenu({ showOptions: !showOptions })
    dispatch(action)
  }

  const iconClassName = showOptions ? "fas fa-caret-down" : "fas fa-caret-right"

  return (
    <h3>
      <Link
        to="#"
        onClick={toggleCaret}
      >
        <Icon className={iconClassName} />
        {" "}
        Menu
      </Link>
    </h3>
  )
}


const Links = (props) => {
  const {
    dispatch,
    month,
    year,
    isFuture,
    requiresSetUp,
    showAccruals,
    showCleared,
    showOptions,
    sortOrder,
  } = props

  const toggleAccruals = (e) => {
    e.preventDefault()
    const action = toggleAccrualItems({ showAccruals: !showAccruals })
    dispatch(action)
  }

  const toggleCleared = (e) => {
    e.preventDefault()
    const action = toggleClearedItems({ showCleared: !showCleared })
    dispatch(action)
  }

  const newSortOrder = sortOrder === "byName" ? "byAmount" : "byName"
  const toggleSort = (e) => {
    e.preventDefault()
    const action = changeItemSortOrder({ sortOrder: newSortOrder })
    dispatch(action)
  }

  if (showOptions) {
    return (
      <div>
        <SetUpButton
          dispatch={dispatch}
          month={month}
          year={year}
          isFuture={isFuture}
          requiresSetUp={requiresSetUp}
        />
        <hr />
        <Link to="/budget/categories">
          <div className="budget-action">
            <strong>Manage Categories</strong>
          </div>
        </Link>
        <Link to="/budget/icons">
          <div className="budget-action">
            <strong>Manage Icons</strong>
          </div>
        </Link>
        <hr />
        <Link
          to="#"
          onClick={toggleSort}
        >
          <div className="budget-action">
            <strong>Order {newSortOrder.replace( /([A-Z])/g, " $1" )}</strong>
          </div>
        </Link>
        <Link
          to="#"
          onClick={toggleCleared}
        >
          <div className="budget-action">
            <strong>{showCleared ? "Hide" : "Show"} Cleared Monthly Items</strong>
          </div>
        </Link>
        <Link
          to="#"
          onClick={toggleAccruals}
        >
          <div className="budget-action">
            <strong>{showAccruals ? "Hide" : "Show"} Accruing Items</strong>
          </div>
        </Link>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.budget.menuOptions,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(Menu)
