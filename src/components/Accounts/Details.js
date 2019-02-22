import React from 'react'
import ManageButton from "./ManageButton"
import TransactionsWrapper from "../Transactions/Wrapper"

export default ({ month, year, selectedAccountId }) => {
  if (selectedAccountId === 0) {
    return(
      <ManageButton />
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
