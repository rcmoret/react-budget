import React from "react"
import { connect } from "react-redux"

import { transfer as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { updatePage } from "./actions"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"

const PaginationLinks = ({ dispatch, metadata }) => {
  const { currentPage, limit, total } = metadata
  const totalPages = Math.ceil(total / limit)

  const viewFirst = (e) => {
    e.preventDefault()
    const action = updatePage(1)
    dispatch(action)
  }

  const viewPrevious = (e) => {
    e.preventDefault()
    const action = updatePage(currentPage - 1)
    dispatch(action)
  }

  const viewNext = (e) => {
    e.preventDefault()
    const action = updatePage(currentPage + 1)
    dispatch(action)
  }

  const viewLast = (e) => {
    e.preventDefault()
    const action = updatePage(totalPages)
    dispatch(action)
  }

  return (
    <div className="transfers-pagination">
      <LinkToFirst
        currentPage={currentPage}
        onClick={viewFirst}
        totalPages={totalPages}
      />
      {" "}
      <LinkToPrevious
        currentPage={currentPage}
        onClick={viewPrevious}
      />
      <Ellipsis
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <LinkToNext
        currentPage={currentPage}
        onClick={viewNext}
        totalPages={totalPages}
      />
      {" "}
      <LinkToLast
        currentPage={currentPage}
        onClick={viewLast}
        totalPages={totalPages}
      />
    </div>
  )
}

const LinkToFirst = ({ currentPage, onClick, totalPages }) => {
  if (totalPages > 1 && currentPage > 1) {
    return (
      <Link
        to="#"
        onClick={onClick}
      >
        <Icon className="fas fa-angle-double-left" />
        {" "}
        {titleize(copy.first)}
      </Link>
    )
  } else {
    return null
  }
}

const LinkToPrevious = ({ currentPage, onClick }) => {
  if (currentPage > 2) {
    return (
      <Link
        to="#"
        onClick={onClick}
      >
        <Icon className="fas fa-caret-left" />
        {" "}
        {titleize(copy.previous)}
      </Link>
    )
  } else {
    return null
  }
}

const Ellipsis = ({ currentPage, totalPages }) => {
  if (currentPage === 1 || totalPages === currentPage) {
    return null
  } else {
    return (
      <span>{copy.ellipsis}</span>
    )
  }
}

const LinkToNext = ({ currentPage, onClick, totalPages }) => {
  if (currentPage < (totalPages - 1)) {
    return (
      <Link
        to="#"
        onClick={onClick}
      >
        {titleize(copy.next)}
        {" "}
        <Icon className="fas fa-caret-right" />
      </Link>
    )
  } else {
    return null
  }
}

const LinkToLast = ({ currentPage, onClick, totalPages }) => {
  if (currentPage < totalPages) {
    return (
      <Link
        to="#"
        onClick={onClick}
      >
        {titleize(copy.last)}
        {" "}
        <Icon className="fas fa-angle-double-right" />
      </Link>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return { metadata: state.transfers.metadata }
}

export default connect(mapStateToProps)(PaginationLinks)
