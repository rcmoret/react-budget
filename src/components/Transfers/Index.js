import React from "react"
import { connect } from "react-redux"

import { transfer as copy, transaction as txnCopy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { fetched } from "./actions"
import { fetched as renderAccounts } from "../Accounts/actions"

import { getAccounts } from "../Accounts/graphqlQueries"
import { getTransfers } from "./graphqlQueries"

import Tabs from "../Accounts/Tabs"
import Icon from "../Icons/Icon"
import NewTransfer from "./NewTransfer"
import PaginationLinks from "./PaginationLinks"
import Transfer from "./Transfer"

const Index = ({ accounts, accountsFetched, collection, dispatch, fetchedTransfers, metadata }) => {
  const { currentPage, total, viewing } = metadata

  if(!accountsFetched) {
    const action = result => dispatch(renderAccounts(result.data.accounts))
    getAccounts(action)
  }

  if (accountsFetched && !fetchedTransfers) {
    const action = result => dispatch(fetched(result.data.transfers))
    getTransfers({
      page: currentPage,
      limit: 10,
      onSuccess: action
    })

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
    if (a.fromTransaction.clearanceDate === b.fromTransaction.clearanceDate) {
      return 0
    } else if (a.fromTransaction.clearanceDate === null) {
      return b.fromTransaction.clearanceDate > today ? -1 : 1
    } else if (b.fromTransaction.clearanceDate === null) {
      return a.fromTransaction.clearanceDate > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.fromTransaction.clearanceDate > b.fromTransaction.clearanceDate) ? 1 : -1
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
