import React from 'react'
import Account from "./Account"
import AccountOptions from "./AccountOptions"
import Transactions from "../Transactions/Transactions"

const AccountDetail = (props) => {
  if (props.selectedAccount.id === 0) {
    return(
      <AccountOptions {...props} />
    )
  } else {
    return(
      <Transactions selectedAccount={props.selectedAccount} />
    )
  }
}

const AccountsContainer = (props) => (
  <div className="accounts">
    {props.accounts.map((account) =>
      <Account key={account.id} {...account} />
    )}
    <AccountDetail selectedAccount={props.selectedAccount} />
    <hr/>
  </div>
)

export default AccountsContainer
