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
  const { clearance_date } = payload
  const { include_pending } = state.metadata.query_options
  const { prior_balance, date_range } = state.metadata
  const inRange = isInRange(clearance_date, date_range)
  const collection = ((include_pending && clearance_date === null) || inRange) ? [...state.collection, payload] : state.collection
  const newPrior = before(clearance_date, date_range[0]) ? (prior_balance + payload.amount) : prior_balance
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
  const collection = updatedCollection(payload, state)
  const newPrior = before(clearance_date, date_range[0]) ? (prior_balance + payload.amount) : prior_balance
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
        return objectifyTransaction({ ...txn, ...payload })
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
