import React from "react"
import { connect } from "react-redux"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import { toggleMenu } from "../../actions/budget"
import SetUpButton from "./SetUpButton"

const Menu = ({ dispatch, month, year, isFuture, requiresSetUp, showMenu }) => {
  return (
    <nav className="budget-actions">
      <Title
        dispatch={dispatch}
        showMenu={showMenu}
      />
      <Links
        dispatch={dispatch}
        month={month}
        year={year}
        isFuture={isFuture}
        requiresSetUp={requiresSetUp}
        showMenu={showMenu}
      />
    </nav>
  )
}

const Title = ({ dispatch, showMenu }) => {
  const toggleCaret = (e) => {
    e.preventDefault()
    const action = toggleMenu({ showMenu: !showMenu })
    dispatch(action)
  }

  const iconClassName = showMenu ? "fas fa-caret-down" : "fas fa-caret-right"

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


const Links = ({ dispatch, month, year, isFuture, requiresSetUp, showMenu }) => {
  if (showMenu) {
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
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showMenu: state.budget.showMenu,
    ...ownProps
  }
}

export default connect(mapStateToProps)(Menu)
