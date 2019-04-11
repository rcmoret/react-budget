import React from "react"
import TransfersLink from "./TransfersLink"
import ManageButton from "./ManageButton"
import TransactionsWrapper from "../Transactions/Wrapper"

export default ({ month, year, selectedAccountId }) => {
  if (selectedAccountId === 0) {
    return(
      <div>
        <TransfersLink />
        <ManageButton />
      </div>
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
