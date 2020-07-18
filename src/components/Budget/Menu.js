import React from "react"
import { connect } from "react-redux"

import { icon as iconCopy, budget as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"
import {
  changeItemSortOrder,
  toggleAccrualItems,
  toggleClearedItems,
} from "../../actions/budget"

import DateFormatter, { isToday } from "../../functions/DateFormatter"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import SetUpButton from "./SetUpButton"

const {
  category,
  item,
  menu,
} = copy

const {
  finalizeLinkText,
  hide,
  order,
  show,
  title,
} = menu

const {
  cleared,
  items,
} = item

const {
  accruing,
  categories,
  monthly,
} = category

const Menu = (props) => (
  <nav className="budget-actions">
    <Title />
    <Links
      {...props}
    />
  </nav>
)

const Title = () => (
  <h3>
    &bull;
    {" "}
    {titleize(title)}
  </h3>
)

const Links = (props) => {
  const {
    dispatch,
    isEndOfMonth,
    isFuture,
    month,
    requiresCloseOut,
    requiresSetUp,
    showAccruals,
    showCleared,
    sortOrder,
    year,
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

  return (
    <div>
      <SetUpButton
        dispatch={dispatch}
        month={month}
        year={year}
        isFuture={isFuture}
        requiresSetUp={requiresSetUp}
      />
      <FinalizeButton
        isEndOfMonth={isEndOfMonth}
        month={month}
        requiresCloseOut={requiresCloseOut}
        year={year}
      />
      <MenuLink
        linkCopy={categories}
        path="/budget/categories"
      />
      <MenuLink
        linkCopy={iconCopy.icons}
        path={"/budget/icons"}
      />
      <hr />
      <MenuLink
        iconClassName="fas fa-exchange-alt fa-rotate-90"
        linkCopy={`${order} ${newSortOrder.replace(/([A-Z])/g, " $1")}`}
        onClick={toggleSort}
      />
      <MenuLink
        iconClassName={showCleared ? "far fa-eye-slash" : "far fa-eye"}
        linkCopy={`${(showCleared ? hide : show)} ${cleared} ${monthly} ${items}`}
        onClick={toggleCleared}
        showCleared={showCleared}
      />
      <MenuLink
        onClick={toggleAccruals}
        iconClassName={showAccruals ? "fas fa-book-open" : "fas fa-book"}
        linkCopy={`${(showAccruals ? hide : show)} ${accruing} ${items}`}
        showAccruals={showAccruals}
      />
    </div>
  )
}

export const MenuLink = ({ iconClassName, linkCopy, onClick, path }) => {
  const to = path || "#"

  return (
    <Link to={to} onClick={onClick} >
      <div className="budget-action">
        <strong>
          &#9702;
          {" "}
          <Icon className={iconClassName} />
          {" "}
          {titleize(linkCopy)}
        </strong>
      </div>
    </Link>
  )
}

const FinalizeButton = ({ isEndOfMonth, month, requiresCloseOut, year }) => {
  const linkCopy = finalizeLinkText(DateFormatter({ month: month, year: year, format: "monthYear" }))

  if (!isEndOfMonth || !requiresCloseOut) {
    return null
  } else {
    return (
      <MenuLink
        linkCopy={linkCopy}
        path={`/budget/finalize/${month}/${year}/start`}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isEndOfMonth = isToday(new Date(ownProps.year, ownProps.month, 0))

  return {
    isEndOfMonth: isEndOfMonth,
    ...state.budget.menuOptions,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(Menu)
