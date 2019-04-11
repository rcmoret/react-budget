import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { fetched } from "../../actions/transfers"

import Icon from "../Icons/Icon"
import PaginationLinks from "./PaginationLinks"
import Transfer from "./Transfer"

const Index = ({ collection, dispatch, fetchedTransfers, metadata }) => {
  console.log(metadata)
  const { currentPage, total, viewing } = metadata
  if (!fetchedTransfers) {
    const url = ApiUrlBuilder(["transfers"], { page: currentPage })
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetched(data)))
  }

  return (
    <div className="transfers">
      <h2>Recent Transfers</h2>
      <hr/>

      Viewing {viewing[0]} - {viewing[1]} of {total}
      <div className="transfer">
        <div className="clearance-date">
          Clearance Date
          {" "}
          <Icon className="fas fa-calendar-alt" />
        </div>
        <div className="from-account">
          From
        </div>
        <div className="to-account">
          To
        </div>
        <div className="amount">
          Amount
        </div>
      </div>
      {collection.map(transfer => (
        <Transfer key={transfer.id} { ...transfer } />
      ))}
      <PaginationLinks />
    </div>
  )
}

const mapStateToProps = (state) => {
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)

  const collection = state.transfers.collection.sort((a, b) => {
    if (a.from_transaction.clearance_date === b.from_transaction.clearance_date) {
      return 0
    } else if (a.from_transaction.clearance_date === null) {
      return b.from_transaction.clearance_date > today ? -1 : 1
    } else if (b.clearance_date === null) {
      return a.from_transaction.clearance_date > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.from_transaction.clearance_date > b.from_transaction.clearance_date) ? 1 : -1
    }
  })
  return {
    ...state.transfers,
    collection: collection,
  }
}

export default connect(mapStateToProps)(Index)
