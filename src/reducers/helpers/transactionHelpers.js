import { before, isInRange } from "../../functions/DateFormatter"
import objectifyTransaction from "../../shared/models/transaction"

export const editDetailProps = (txn, newProps) => {
  return {
    ...txn,
    details: txn.details.map(detail => {
      if (detail._id !== newProps.detailId) {
        return detail
      } else {
        return {
          ...detail,
          updatedProps: {
            ...detail.updatedProps,
            ...newProps,
          }
        }
      }
    })
  }
}

export const createTransaction = (payload, state) => {
  const { clearanceDate } = payload
  const { includePending } = state.metadata.query_options
  const { priorBalance, dateRange } = state.metadata
  const inRange = isInRange(clearanceDate, dateRange)
  const newTxn = objectifyTransaction(payload)
  const collection = ((includePending && clearanceDate === null) || inRange) ? [...state.collection, newTxn] : state.collection
  const newPrior = before(clearanceDate, dateRange[0]) ? (priorBalance + payload.amount) : priorBalance
  return {
    ...state,
    metadata: {
      ...state.metadata,
      prior_balance: newPrior,
    },
    collection: collection,
    budgetItems: {
      ...state.budgetItems,
      fetched: false
    },
  }
}

export const updatedTransaction = (payload, state) => {
  const { clearanceDate } = payload
  const { priorBalance, dateRange } = state.metadata
  const newTxn = objectifyTransaction(payload)
  const collection = updatedCollection(newTxn, state)
  const newPrior = before(clearanceDate, dateRange[0]) ? (priorBalance + payload.amount) : priorBalance
  return {
    ...state,
    metadata: {
      ...state.metadata,
      prior_balance: newPrior,
    },
    collection: collection,
    budgetItems: {
      ...state.budgetItems,
      fetched: false
    },
  }
}

const updatedCollection = (payload, state) => {
  const { clearanceDate } = payload
  const { includePending } = state.metadata.query_options
  const { dateRange } = state.metadata
  const inRange = isInRange(clearanceDate, dateRange)

  if ((includePending && clearanceDate === null) || inRange) {
    return state.collection.map(txn => {
      if (txn.id !== payload.id) {
        return txn
      } else {
        return { ...txn, ...payload }
      }
    })
  } else {
    return state.collection.filter(txn => txn.id !== payload.id)
  }
}

export const updateNewDetail = (payload, state) => {
  const { details } = state.new
  const { index, attributes } = payload
  const updatedDetails = details.map((detail, n) => {
    return n === index ? { ...detail, ...attributes } : detail
  })

  return {
    ...state,
    new: {
      ...state.new,
      details: updatedDetails,
    }
  }
}

export const transferCreated = (payload, state) => {
  const selectedAccountId = state.metadata.query_options.account_id
  const toTransaction = payload.to_transaction
  const fromTransaction = payload.from_transaction
  const toAccountId = toTransaction.account_id
  const fromAccountId = fromTransaction.account_id

  if (selectedAccountId === undefined) {
    return state
  } else if (toAccountId === parseInt(selectedAccountId)) {
    return createTransaction(toTransaction, state)
  } else if (fromAccountId === parseInt(selectedAccountId)) {
    return createTransaction(fromTransaction, state)
  } else {
    return state
  }
}

export const transferDeleted = (payload, state) => {
  const transferId = payload.id

  return {
    ...state,
    collection: state.collection.filter(txn => txn.transfer_id !== transferId)
  }
}
