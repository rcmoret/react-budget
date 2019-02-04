import React, { Component } from "react"
import Header from "./Header"
import Transaction from "./Transaction"

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillMount() {
    fetch(this.state.url)
      .then(response => response.json())
      .then(data => this.setState({ collection: data }))
  }

  render() {
    const { budgetCategory, collection } = this.state
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
              budgetCategory={budgetCategory}
            />
          )}
        </div>
      </div>
      )
    } else {
      return null
    }
  }
}

Transactions.defaultProps = {
  collection: [],
}

export default Transactions;
