import React from "react"
import { connect } from "react-redux"

import { transaction as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import formatted, * as DateFormatter from "../../functions/DateFormatter"

import AddTransaction from "./AddTransaction"
import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import Transaction from "./Show/Show"

const Transactions = (props) => {
  const {
    accountId,
    collection,
    endDate,
    initialTransaction,
    nextMonth,
    prevMonth,
    startDate,
  } = props

  const nextMonthUrl = `/accounts/${accountId}/${nextMonth.month}/${nextMonth.year}`
  const prevMonthUrl = `/accounts/${accountId}/${prevMonth.month}/${prevMonth.year}`

  return (
    <div className="transactions">
      <h2>{titleize(copy.title)}</h2>
      <div className="transaction-metadata">
        <div className="date-range">
          {copy.dateRange(startDate, endDate)}
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
      <Transaction key="0" {...initialTransaction} />
      {collection.map(transaction =>
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
  const startDate = DateFormatter.fromDateString(metadata.dateRange[0])
  const endDate =  DateFormatter.fromDateString(metadata.dateRange[1])
  const date = new Date()
  const today = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10)

  const orderedTransactions = collection.sort(function(a, b) {
    if (a.clearanceDate === b.clearanceDate) {
      return 0
    } else if (a.clearanceDate === null) {
      return b.clearanceDate > today ? -1 : 1
    } else if (b.clearanceDate === null) {
      return a.clearanceDate > today ? 1 : -1
    } else {
      // equailty is handled above
      return (a.clearanceDate > b.clearanceDate) ? 1 : -1
    }
  })

  const collectionWithBalance = () => {
    let balance = metadata.priorBalance
    return orderedTransactions.map(transaction => {
      balance += transaction.details.reduce((sum, detail) => sum + detail.amount, 0)
      return { balance: balance, ...transaction }
    })
  }

  const initialTransaction = {
    amount: null,
    balance: metadata.priorBalance,
    clearanceDate: metadata.dateRange[0],
    description: "Balance",
    details: [
      {
        amount: null,
        budgetCategory: null,
        iconClassName: null,
      },
    ],
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
