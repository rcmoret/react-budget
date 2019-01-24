import React from 'react'
import { connect } from 'react-redux';
import Account from "./Account"
import AccountOptions from "./AccountOptions"
import Transactions from "../Transactions/Transactions"

const AccountDetail = (props) => {
  if (props.selectedAccountId === 0) {
    return(
      <AccountOptions {...props} />
    )
  } else {
    return(
      <Transactions selectedAccountId={props.selectedAccountId} />
    )
  }
}

AccountDetail.defaultProps = {
  selectedAccount: {
    id: 0,
  },
}

const AccountsContainer = (props) => {
  const orderedAccounts = props.accounts.sort((a, b) => {
      return a.priority - b.priority
    })

  return (
    <div className="accounts">
      {orderedAccounts.map((account) =>
        <Account
          key={account.id}
          {...account}
          selectedAccountId={props.selectedAccountId}
        />
      )}
      <AccountDetail selectedAccountId={props.selectedAccountId} />
      <hr/>
    </div>
  )
}

AccountsContainer.defaultProps = {
  accounts: [],
  selectedAccountId: 0,
}

function mapStateToProps(state, ownProps) {
  return { accounts: state.accounts.collection, ...ownProps }
}

export default connect(mapStateToProps)(AccountsContainer)
