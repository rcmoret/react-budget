import { before, isInRange } from "../../functions/DateFormatter"
import objectifyTransaction from "../../models/transaction"

export const editNew = (transaction, newProps) => {
  const editedNew = { ...transaction, ...newProps }
  const { budget_exclusion } = editedNew

  if (!budget_exclusion) {
    return editedNew
  } else {
    return {
      ...editedNew,
      details: editedNew.details.map(detail => ({ ...detail, budget_item_id: null }))
    }
  }
}

export const editProps = (transaction, newProps) => {
  if (!newProps.budget_exclusion) {
    return {
      ...transaction,
      updatedProps: { ...transaction.updatedProps, ...newProps }
    }
  } else {
    return {
      ...transaction,
      updatedProps: { ...transaction.updatedProps, ...newProps },
      details: transaction.details.map(detail => ({ ...detail, budget_item_id: null }))
    }
  }
}

export const editDetailProps = (txn, newProps) => {
  return {
    ...txn,
    details: txn.details.map(detail => {
      if (!txn.budget_exclusion) {
        return {
          ...detail,
          updatedProps: {
            ...detail.updatedProps,
            ...newProps,
          }
        }
      } else {
        return {
          ...detail,
          updatedProps: {
            ...detail.updatedProps,
            ...newProps,
            budget_item_id: null,
          }
        }
      }
    })
  }
}

export const createTransaction = (payload, state) => {
  const { clearance_date } = payload
  const { include_pending } = state.metadata.query_options
  const { prior_balance, date_range } = state.metadata
  const inRange = isInRange(clearance_date, date_range)
  const newTxn = objectifyTransaction(payload)
  const collection = ((include_pending && clearance_date === null) || inRange) ? [...state.collection, newTxn] : state.collection
  const newPrior = before(clearance_date, date_range[0]) ? (prior_balance + newTxn.amount) : prior_balance
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
  const { clearance_date } = payload
  const { prior_balance, date_range } = state.metadata
  const newTxn = objectifyTransaction(payload)
  const collection = updatedCollection(newTxn, state)
  const newPrior = before(clearance_date, date_range[0]) ? (prior_balance + newTxn.amount) : prior_balance
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
  const { clearance_date } = payload
  const { include_pending } = state.metadata.query_options
  const { date_range } = state.metadata
  const inRange = isInRange(clearance_date, date_range)

  if ((include_pending && clearance_date === null) || inRange) {
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
  const { budget_exclusion, details } = state.new
  const { index, attributes } = payload
  const itemIdFor = (detail) => budget_exclusion ? null : detail.budget_item_id
  const updatedDetails = details.map((detail, n) => {
    if (n === index) {
      return { ...detail, ...attributes, budget_item_id: itemIdFor({ ...detail, ...attributes }) }
    } else {
      return { ...detail, budget_item_id: itemIdFor(detail) }
    }
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
