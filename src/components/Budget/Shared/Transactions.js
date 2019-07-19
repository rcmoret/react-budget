import React from "react"
import Header from "./Header"
import Transaction from "./Transaction"

const Transactions = (props) => {
  const { collection } = props
  if (collection.length > 0) {
    return (
      <div className="budget-transactions">
        <Header />
        {collection.map((transaction) =>
          <Transaction
            key={transaction.id}
            {...transaction}
            budgetCategory={props.budgetCategory}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

export default Transactions
