import React from "react"
import { connect } from "react-redux"

import { transfer as copy, transaction as txnCopy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { fetched } from "./actions"
import { fetched as renderAccounts } from "../Accounts/actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { get } from "../../functions/ApiClient"

import Tabs from "../Accounts/Tabs"
import Icon from "../Icons/Icon"
import NewTransfer from "./NewTransfer"
import PaginationLinks from "./PaginationLinks"
import Transfer from "./Transfer"

const Index = (props) => {
  const { accounts, accountsFetched, apiErrorPresent, collection, dispatch, fetchedTransfers, metadata } = props
  const { currentPage, total, viewing } = metadata

  if(!apiErrorPresent && !accountsFetched) {
    const url = ApiUrlBuilder({ route: "accounts-index" })
    const onSuccess = data => dispatch(renderAccounts(data))
    get(url, onSuccess)
  }

  if (!apiErrorPresent && accountsFetched && !fetchedTransfers) {
    const url = ApiUrlBuilder({ route: "transfers-index", query: { page: currentPage } })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
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
        <h2>{titleize(copy.title)}</h2>
        <hr/>

        {copy.iOfN(viewing, total)}
        <div className="transfer">
          <div className="clearance-date">
            {titleize(txnCopy.clearanceDate)}
            {" "}
            <Icon className="fas fa-calendar-alt" />
          </div>
          <div className="from-account">
            {titleize(copy.from)}
          </div>
          <div className="to-account">
            {titleize(copy.to)}
          </div>
          <div className="amount">
            {titleize(txnCopy.amount)}
          </div>
        </div>
        {collection.map(transfer => (
          <Transfer key={transfer.id} {...transfer} />
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

  const apiErrorPresent = state.messages.errors.api.length > 0

  return {
    ...state.transfers,
    accounts: state.accounts.collection,
    collection: collection,
    accountsFetched: accountsFetched,
    apiErrorPresent: apiErrorPresent,
  }
}

export default connect(mapStateToProps)(Index)
