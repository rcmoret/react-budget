import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { fetched } from "./actions"
import { fetched as renderAccounts } from "../Accounts/actions"

import Tabs from "../Accounts/Tabs"
import Icon from "../Icons/Icon"
import NewTransfer from "./NewTransfer"
import PaginationLinks from "./PaginationLinks"
import Transfer from "./Transfer"

const Index = ({ accounts, accountsFetched, collection, dispatch, fetchedTransfers, metadata }) => {
  const { currentPage, total, viewing } = metadata

  if(!accountsFetched) {
    const url = ApiUrlBuilder(["accounts"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(renderAccounts(data)))
  }

  if (accountsFetched && !fetchedTransfers) {
    const url = ApiUrlBuilder(["transfers"], { page: currentPage })
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetched(data)))
  }

  return (
    <div>
      <div className="accounts">
        <Tabs
          collection={accounts}
          selectedAccountId={0}
        />
      </div>
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
        <hr />
        <NewTransfer />
        <PaginationLinks />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)
  const { accountsFetched } = state.accounts

  const collection = state.transfers.collection.sort((a, b) => {
    if (a.from_transaction.clearance_date === b.from_transaction.clearance_date) {
      return 0
    } else if (a.from_transaction.clearance_date === null) {
      return b.from_transaction.clearance_date > today ? -1 : 1
    } else if (b.from_transaction.clearance_date === null) {
      return a.from_transaction.clearance_date > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.from_transaction.clearance_date > b.from_transaction.clearance_date) ? 1 : -1
    }
  })

  return {
    ...state.transfers,
    accounts: state.accounts.collection,
    collection: collection,
    accountsFetched: accountsFetched,
  }
}

export default connect(mapStateToProps)(Index)
