import React from 'react'
import { connect } from 'react-redux';
import Account from "./Account"
import AccountOptions from "./AccountOptions"
import TransactionsWrapper from "../Transactions/Wrapper"

const AccountDetail = ({ month, year, selectedAccountId }) => {
  if (selectedAccountId === 0) {
    return(
      <AccountOptions />
    )
  } else {
    return(
      <TransactionsWrapper
        accountId={selectedAccountId}
        month={month}
        year={year}
      />
    )
  }
}

const AccountsContainer = ({ collection, month, year, selectedAccountId }) => {
  return (
    <div className="accounts">
      {collection.map(account =>
        <Account
          key={account.id}
          {...account}
          selectedAccountId={selectedAccountId}
        />
      )}
      <AccountDetail
        selectedAccountId={selectedAccountId}
        month={month}
        year={year}
      />
      <hr/>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const collection = state.accounts.collection.sort((a, b) => {
      return a.priority - b.priority
    })
  const { month, year, selectedAccountId } = ownProps

  return {
    collection: collection,
    selectedAccounId: selectedAccountId,
    month: month,
    year: year,
  }
}

export default connect(mapStateToProps)(AccountsContainer)
