import { before, isInRange } from "../../functions/DateFormatter"
import findOrDefault from "../../functions/FindOrDefault"
import objectifyTransaction from "../../models/transaction"

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

export const editDetailProps = (txn, newProps) => {
  const isBudgetInclusion = !txn.budget_exclusion

  const isTarget = (detail) => newProps.detailId === detail.id || newProps.detailId === detail._id

  return {
    ...txn,
    details: txn.details.map(detail => {
      if (isTarget(detail) && isBudgetInclusion) {
        return {
          ...detail,
          updatedProps: {
            ...detail.updatedProps,
            ...newProps,
          }
        }
      } else if (isBudgetInclusion) {
        return detail
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

export const removeDetail = ({ amount, clearance_date, detailId, transactionId, state }) => {
  const { prior_balance, date_range } = state.metadata
  const updated = transaction => {
    const updatedTransaction = {
      ...transaction,
      details: transaction.details.filter(detail => detail.id !== detailId)
    }
    return objectifyTransaction(updatedTransaction)
  }
  const newPrior = before(clearance_date, date_range[0]) ? (prior_balance + amount) : prior_balance

  return {
    ...state,
    metadata: {
      ...state.metadata,
      prior_balance: newPrior,
    },
    collection: state.collection.map(txn => txn.id === transactionId ? updated(txn) : txn),
  }
}

export const toggleEditForm = (id, state) => {
  const selectedTxn = findOrDefault(state.collection, (txn => txn.id === id), { showForm: true })

  const showForm = !selectedTxn.showForm

  const showFormAttribute = txn => {
    if (txn.id === id) {
      return showForm
    } else if (showForm) {
      return false
    } else {
      return txn.showForm
    }
  }

  return {
    ...state,
    new: { ...state.new, showForm: (showForm ? false : state.new.showForm) },
    collection: state.collection.map(txn => (
      {...txn, showForm: showFormAttribute(txn)}
    )),
  }

}

export const transferCreated = (payload, state) => {
  const selectedAccountId = state.metadata.query_options.account_id
  const toTransaction = payload.to_transaction
  const fromTransaction = payload.from_transaction
  const toAccountId = toTransaction.account_id
  const fromAccountId = fromTransaction.account_id

  if (selectedAccountId === undefined || selectedAccountId === null) {
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
