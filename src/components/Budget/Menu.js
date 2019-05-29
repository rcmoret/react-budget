import React from "react"
import { connect } from "react-redux"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import { toggleClearedItems, toggleMenu } from "../../actions/budget"
import SetUpButton from "./SetUpButton"

const Menu = (props) => {
  const {
    dispatch,
    month,
    year,
    isFuture,
    requiresSetUp,
    showCleared,
    showOptions
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
        showCleared={showCleared}
        showOptions={showOptions}
      />
    </nav>
  )
}

const Title = ({ dispatch, showOptions }) => {
  const toggleCaret = (e) => {
    console.log(e)
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
    showCleared,
    showOptions,
  } = props

  const toggleCleared = (e) => {
    e.preventDefault()
    const action = toggleClearedItems({ showCleared: !showCleared })
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
        <Link
          to="#"
          onClick={toggleCleared}
        >
          <div className="budget-action">
            <strong>{showCleared ? "Hide" : "Show"} Cleared Monthly Items</strong>
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
    showOptions: state.budget.menuOptions.showOptions,
    showCleared: state.budget.menuOptions.showCleared,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Menu)
