import React from "react"
import Header from "./Header"
import Transaction from "./Transaction"

const Transactions = ({ budgetCategory, collection }) => {
  if (collection.length > 0) {
    return (
      <div className="budget-transactions">
        <Header />
        {collection.map(transaction =>
          <Transaction
            key={transaction.id}
            {...transaction}
            budgetCategory={budgetCategory}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

export default Transactions
