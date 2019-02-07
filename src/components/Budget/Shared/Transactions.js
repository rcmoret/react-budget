import React from "react"
import Header from "./Header"
import Transaction from "./Transaction"

const Transactions = (props) => {
  const { collection } = props
  if (collection.length > 0) {
    return (
      <div className="budget-transactions">
        <div className="budget-item-detail">
        <Header />
        <hr/>
        {collection.map((transaction) =>
          <Transaction
            key={transaction.id}
            {...transaction}
            budgetCategory={props.budgetCategory}
          />
        )}
      </div>
    </div>
    )
  } else {
    return null
  }
}

export default Transactions
