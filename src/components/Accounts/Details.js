import React from "react"
import TransfersLink from "./TransfersLink"
import ManageButton from "./ManageButton"
import TransactionsWrapper from "../Transactions/Wrapper"

export default ({ month, year, selectedAccount, selectedAccountId, slug }) => {
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
          slug={slug}
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
