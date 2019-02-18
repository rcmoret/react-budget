import React from 'react'
import { connect } from 'react-redux';
import Account from "./Account"
import AccountOptions from "./AccountOptions"
import TransactionsWrapper from "../Transactions/Wrapper"

const AccountDetail = ({ selectedAccountId }) => {
  if (selectedAccountId === 0) {
    return(
      <AccountOptions />
    )
  } else {
    return(
      <TransactionsWrapper accountId={selectedAccountId} />
    )
  }
}

const AccountsContainer = ({ collection, selectedAccountId }) => {
  return (
    <div className="accounts">
      {collection.map(account =>
        <Account
          key={account.id}
          {...account}
          selectedAccountId={selectedAccountId}
        />
      )}
      <AccountDetail selectedAccountId={selectedAccountId} />
      <hr/>
    </div>
  )
}

function mapStateToProps(state, ownProps) {
  const collection = state.accounts.collection.sort((a, b) => {
      return a.priority - b.priority
    })
  const { selectedAccountId } = ownProps

  return {
    collection: collection,
    selectedAccounId: selectedAccountId
  }
}

export default connect(mapStateToProps)(AccountsContainer)
