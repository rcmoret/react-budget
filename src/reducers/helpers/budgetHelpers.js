import { updateItemInCollection } from "./shared"
import objectifyDiscretionary from "../../shared/models/discretionary"
import objectifyMonthly from "../../shared/models/monthlyBudgetItem"
import objectifyWeekly from "../../shared/models/weeklyBudgetItem"

export const createMonthly = (payload, state) => {
  const { collection, metadata } = payload
  const monthlyCollection = collection.filter(item => item.monthly)
    .map(item => objectifyMonthly(item))
  const weeklyCollection = collection.filter(item => !item.monthly)
    .map(item => objectifyWeekly(item, metadata))

  const collections = {
    monthly: {
      collection: monthlyCollection,
    },
    weekly: {
      collection: weeklyCollection,
    },
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, collections),
    monthly: {
      ...state.monthly,
      collection: monthlyCollection,
    },
    weekly: {
      ...state.weekly,
      collection: weeklyCollection,
    },
    itemsFetched: true,
    metadata: {
      ...state.metadata,
      ...metadata,
    }
  }
}

export const addMonthlyItem = (item, state) => {
  const { month, year } = state.metadata
  // if the item is not in the current month
  if (!(item.month === month && item.year === year)) {
    return state
  }

  const newCollection = [...state.monthly.collection, objectifyMonthly(item)]
  const collections = {
    weekly: {
      collection: state.weekly.collection,
    },
    monthly: {
      collection: newCollection,
    }
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(state.discretionary, collections),
    monthly: {
      ...state.monthly,
      collection: newCollection,
    },
  }
}

export const addWeeklyItem = (item, state) => {
  const { month, year } = state.metadata
  // if the item is not in the current month
  if (!(item.month === month && item.year === year)) {
    return state
  }

  const newCollection = [...state.weekly.collection, objectifyWeekly(item, state.metadata)]
  const collections = {
    weekly: {
      collection: newCollection,
    },
    monthly: {
      collection: state.monthly.collection
    }
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(state.discretionary, collections),
    weekly: {
      ...state.weekly,
      collection: newCollection,
    },
  }
}

export const removeMonthly = (id, state) => {
  const newCollection = state.monthly.collection.filter(item => item.id !== id)

  const collections = {
    weekly: {
      collection: state.weekly.collection,
    },
    monthly: {
      collection: newCollection,
    }
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(state.discretionary, collections),
    monthly: {
      ...state.monthly,
      collection: newCollection,
    },
  }
}

export const removeWeekly = (id, state) => {
  const newCollection = state.weekly.collection.filter(item => item.id !== id)

  const collections = {
    weekly: {
      collection: newCollection,
    },
    monthly: {
      collection: state.monthly.collection,
    }
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(state.discretionary, collections),
    weekly: {
      ...state.weekly,
      collection: newCollection,
    },
  }
}

export const updateMonthlyItem = (item, state) => {
  // TODO: check the month/year and call a function to take the item out of the collection
  // if there is a mismatch. This should not happen given the current set up but still worth
  // considering

  const originalItem = state.monthly.collection.find(_item => _item.id === item.id)
  const updatedItem = objectifyMonthly({ ...originalItem, ...item })

  const newCollection = updateItemInCollection({
    updatedItem: updatedItem,
    collection: state.monthly.collection,
    save: true
  })

  const collections = {
    weekly: {
      collection: state.weekly.collection,
    },
    monthly: {
      collection: newCollection,
    }
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(state.discretionary, collections),
    monthly: {
      ...state.monthly,
      collection: newCollection,
    },
  }
}

export const updateWeeklyItem = (item, state) => {
  // TODO: check the month/year and call a function to take the item out of the collection
  // if there is a mismatch. This should not happen given the current set up but still worth
  // considering

  const originalItem = state.weekly.collection.find(_item => _item.id === item.id)
  const updatedItem = objectifyWeekly({ ...originalItem, ...item }, state.metadata)

  const newCollection = updateItemInCollection({
    updatedItem: updatedItem,
    collection: state.weekly.collection,
    save: true
  })

  const collections = {
    weekly: {
      collection: newCollection,
    },
    monthly: {
      collection: state.monthly.collection
    }
  }

  return {
    ...state,
    discretionary: objectifyDiscretionary(state.discretionary, collections),
    weekly: {
      ...state.weekly,
      collection: newCollection,
    },
  }
}
