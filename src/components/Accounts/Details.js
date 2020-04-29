import React from "react"
import TransfersLink from "./TransfersLink"
import ManageButton from "./ManageButton"
import TransactionsWrapper from "../Transactions/Wrapper"

export default ({ month, year, selectedAccount, selectedAccountId }) => {
  if (selectedAccountId === 0) {
    return (
      <AdminLinks />
    )
  } else {
    return(
      <div>
        <TransactionsWrapper
          accountId={selectedAccountId}
          month={month}
          selectedAccount={selectedAccount}
          year={year}
        />
        <hr />
        <AdminLinks />
      </div>
    )
  }
}

const AdminLinks = () => (
  <div>
    <TransfersLink />
    <ManageButton />
  </div>
)
