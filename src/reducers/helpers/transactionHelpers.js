import { before, isInRange } from "../../shared/Functions/DateFormatter"

const newSubtransaction = ({ id }) => {
  return { _id: id, amount: "", description: "", budget_item_id: "" }
}

const nextId = (subs) => {
  if (subs.length === 0) {
    return 0
  } else {
    return Math.max(...subs.map(sub => sub._id)) + 1
  }
}

const newAmount = (subs) => {
  const amt = subs.reduce((acc, sub) => acc + (parseFloat(sub.amount) || 0), 0)
  return parseFloat(amt).toFixed(2)
}

export const addSubtransaction = (state) => {
  const { subtransactions } = state.new
  return {
    ...state,
    new: {
      ...state.new,
      amount: newAmount(subtransactions),
      subtransactions: [
        ...subtransactions,
        newSubtransaction({ id: nextId(subtransactions) }),
      ]
    }
  }
}

export const addSubtransactions = (state) => {
  const { subtransactions } = state.new
  if (subtransactions.length > 0) {
    return addSubtransaction(state)
  }
  return {
    ...state,
    new: {
      ...state.new,
      amount: newAmount(subtransactions),
      subtransactions: [
        newSubtransaction({ id: 0 }),
        newSubtransaction({ id: 1 }),
      ]
    }
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
    collection: collection
  }
}

export const editSubtransaction = (payload, state) => {
  const { subtransactions } = state.new
  const newCollection = subtransactions.map(sub =>
    sub._id !== payload._id ? sub : { ...sub, ...payload }
  )
  return {
    ...state,
    new: {
      ...state.new,
      amount: newAmount(newCollection),
      subtransactions: newCollection
    }
  }
}

export const removeSubtransaction = (_id, state) => {
  const newCollection = state.new.subtransactions.filter(sub => sub._id !== _id)
  return {
    ...state,
    new: {
      ...state.new,
      amount: newAmount(newCollection),
      subtransactions: newCollection,
    }
  }
}

export const updateNewSubtransaction = (state, payload) => {
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
