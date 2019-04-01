import React from "react"
import { connect } from "react-redux"

import { Link } from "react-router-dom"

import AddTransaction from "./AddTransaction"
import formatted, * as DateFormatter from "../../shared/Functions/DateFormatter"
import Icon from "../Icons/Icon"
import Transaction from "./Show/Show"

const Transactions = (props) => {
  const { accountId, endDate, nextMonth, prevMonth, startDate } = props
  const nextMonthUrl = `/accounts/${accountId}/${nextMonth.month}/${nextMonth.year}`
  const prevMonthUrl = `/accounts/${accountId}/${prevMonth.month}/${prevMonth.year}`

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="transaction-metadata">
        <div className="date-range">
          {startDate} to {endDate}
        </div>
        <div className="page-links">
          <Link to={prevMonthUrl}>
            <Icon className="fas fa-angle-double-left" />
            {formatted({ ...prevMonth, format: "numericMonthYear" })}
          </Link>
          <Link to={nextMonthUrl}>
            {formatted({ ...nextMonth, format: "numericMonthYear" })}
            <Icon className="fas fa-angle-double-right" />
          </Link>
        </div>
      </div>
      <hr/>
      <Transaction key="0" {...props.initialTransaction} />
      {props.collection.map(transaction =>
        <Transaction
          key={transaction.id}
          {...transaction}
          deletable={true}
        />
      )}
      <AddTransaction />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { collection, metadata } = state.transactions
  const startDate = DateFormatter.fromDateString(metadata.date_range[0])
  const endDate =  DateFormatter.fromDateString(metadata.date_range[1])
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)

  const orderedTransactions = collection.sort(function(a, b) {
    if (a.clearance_date === b.clearance_date) {
      return 0
    } else if (a.clearance_date === null) {
      return b.clearance_date > today ? -1 : 1
    } else if (b.clearance_date === null) {
      return a.clearance_date > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.clearance_date > b.clearance_date) ? 1 : -1
    }
  })

  const collectionWithBalance = () => {
    let balance = metadata.prior_balance
    return orderedTransactions.map(transaction => {
      balance += transaction.amount
      return { balance: balance, ...transaction }
    })
  }

  const initialTransaction = {
    balance: metadata.prior_balance,
    clearance_date: metadata.date_range[0],
    amount: null,
    description: "Balance",
    subtransactions: [],
  }

  const { month, year } = ownProps
  const nextMonth = DateFormatter.nextMonth({ month: month, year: year })
  const prevMonth = DateFormatter.prevMonth({ month: month, year: year })

  return {
    ...state.transactions,
    startDate: startDate,
    endDate: endDate,
    initialTransaction: initialTransaction,
    collection: collectionWithBalance(),
    prevMonth: prevMonth,
    nextMonth: nextMonth,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(Transactions)
