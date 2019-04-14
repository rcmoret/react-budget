import { before, isInRange } from "../../shared/Functions/DateFormatter"

export const editSubProps = (txn, newProps) => {
  console.log(newProps)
  return {
    ...txn,
    subtransactions: txn.subtransactions.map(sub => {
      if (sub.id !== newProps.subId) {
        return sub
      } else {
        return {
          ...sub,
          updatedProps: {
            ...sub.updatedProps,
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

export const updateNewSubtransaction = (payload, state) => {
  const { subtransactions } = state.new
  const { index, attributes } = payload
  const updatedSubtransactions = subtransactions.map((sub, n) => {
    return n === index ? { ...sub, ...attributes } : sub
  })

  return {
    ...state,
    new: {
      ...state.new,
      subtransactions: updatedSubtransactions,
    }
  }
}
