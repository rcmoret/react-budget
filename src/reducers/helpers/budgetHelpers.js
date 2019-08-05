import { updateItemInCollection } from "./shared"
import objectifyDiscretionary from "../../shared/models/discretionary"
import objectifyMonthly from "../../shared/models/monthlyBudgetItem"
import objectifyWeekly from "../../shared/models/weeklyBudgetItem"

export const setUpIndex = (payload, state) => {
  const { collection, metadata } = payload
  const items = collection.map(item => {
    if (item.monthly) {
      return objectifyMonthly(item)
    } else {
      return objectifyWeekly(item)
    }
  })

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, items),
    monthly: {
      ...state.monthly,
      collection: items.filter(item => item.monthly),
    },
    weekly: {
      ...state.weekly,
      collection: items.filter(item => !item.monthly),
    },
    itemsFetched: true,
    metadata: {
      ...state.metadata,
      ...metadata,
    }
  }
}

export const addMonthlyItem = (item, state) => {
  const { metadata, monthly, weekly } = state
  const { month, year } = metadata
  // if the item is not in the current month
  if (!(item.month === month && item.year === year)) {
    return state
  }

  const newCollection = [...monthly.collection, objectifyMonthly(item)]

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, [...newCollection, ...weekly.collection]),
    monthly: {
      ...monthly,
      collection: newCollection,
    },
  }
}

export const addWeeklyItem = (item, state) => {
  const { metadata, monthly, weekly } = state
  const { month, year } = metadata
  // if the item is not in the current month
  if (!(item.month === month && item.year === year)) {
    return state
  }

  const newCollection = [...weekly.collection, objectifyWeekly(item)]

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, [...newCollection, ...monthly.collection]),
    weekly: {
      ...weekly,
      collection: newCollection,
    },
  }
}

export const removeMonthly = (id, state) => {
  const { metadata, monthly, setup, weekly } = state
  const newCollection = state.monthly.collection.filter(item => item.id !== id)

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, [...weekly.collection, ...newCollection]),
    monthly: {
      ...monthly,
      collection: newCollection,
    },
    setup: {
      ...setup,
      baseMonth: {
        ...setup.baseMonth,
        isFetched: false
      },
    },
  }
}

export const removeWeekly = (id, state) => {
  const { metadata, monthly, setup, weekly } = state
  const newCollection = weekly.collection.filter(item => item.id !== id)

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, [...monthly.collection, ...newCollection]),
    weekly: {
      ...weekly,
      collection: newCollection,
    },
    setup: {
      ...setup,
      baseMonth: {
        ...state.setup.baseMonth,
        isFetched: false
      },
    },
  }
}

export const updateMonthlyItem = (item, state) => {
  // TODO: check the month/year and call a function to take the item out of the collection
  // if there is a mismatch. This should not happen given the current set up but still worth
  // considering

  const { metadata, monthly, setup, weekly } = state
  const originalItem = state.monthly.collection.find(_item => _item.id === item.id)
  const updatedItem = objectifyMonthly({ ...originalItem, ...item })

  const newCollection = updateItemInCollection({
    updatedItem: updatedItem,
    collection: monthly.collection,
    save: true
  })

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, [...weekly.collection, ...newCollection]),
    monthly: {
      ...monthly,
      collection: newCollection,
    },
    setup: {
      ...setup,
      newMonth: {
        ...setup.newMonth,
        isFetched: false,
      },
      baseMonth: {
        ...setup.baseMonth,
        isFetched: false,
      },
    }
  }
}

export const updateWeeklyItem = (item, state) => {
  // TODO: check the month/year and call a function to take the item out of the collection
  // if there is a mismatch. This should not happen given the current set up but still worth
  // considering

  const { metadata, monthly, setup, weekly } = state
  const originalItem = state.weekly.collection.find(_item => _item.id === item.id)
  const updatedItem = objectifyWeekly({ ...originalItem, ...item }, state.metadata)

  const newCollection = updateItemInCollection({
    updatedItem: updatedItem,
    collection: weekly.collection,
    save: true
  })

  return {
    ...state,
    discretionary: objectifyDiscretionary(metadata, [...monthly.collection, ...newCollection]),
    weekly: {
      ...weekly,
      collection: newCollection,
    },
    setup: {
      ...setup,
      newMonth: {
        ...setup.newMonth,
        isFetched: false,
      },
      baseMonth: {
        ...setup.baseMonth,
        isFetched: false,
      },
    }
  }
}

export const addNewSetupItem = (item, state) => {
  const { metadata, monthly, setup, weekly } = state
  const { month, year } = metadata
  const objectifiedItem = item.monthly ? objectifyMonthly(item) : objectifyWeekly(item)
  const currentItem = month === item.month && year === item.year
  const newMonthly = currentItem && item.monthly ? { ...monthly, collection: [...monthly.collection, objectifiedItem] } : monthly
  const newWeekly = currentItem && item.weekly ? { ...weekly, collection: [...weekly.collection, objectifiedItem] } : weekly
  const discretionary = objectifyDiscretionary(metadata, [...newWeekly, ...newMonthly])

  return {
    ...state,
    discretionary: discretionary,
    monthly: newMonthly,
    weekly: newWeekly,
    setup: {
      ...setup,
      newMonth: {
        ...setup.newMonth,
        newItem: {
          amount: "",
          budget_category_id: null,
          selectedOption: "",
        },
        collection: [
          ...setup.newMonth.collection,
          item,
        ],
      },
    },
  }
}

export const finalizeItemsCollection = (payload) => {
  return payload.collection.map(item => {
    if (item.monthly) {
      return objectifyMonthly({ ...item, status: "pending" })
    } else {
      return objectifyWeekly({ ...item, status: "pending" })
    }
  })
}

export const nextMonthFetched = (payload, state) => {
  return {
    ...state,
    ...setUpIndex(payload, state),
    finalize: {
      ...state.finalize,
      next: {
        ...state.finalize.next,
        ...payload.metadata,
        collection: finalizeItemsCollection(payload),
        isFetched: true,
      },
    },
  }
}

export const updateFinalizeItem = (payload, state) => {
  if (payload.monthly) {
    return updateMonthlyItem(payload, state)
  } else {
    return updateWeeklyItem(payload, state)
  }
}

export const updateExtra = (payload, extra) => {
  const ids = extra.map(item => item.id)

  if (ids.includes(payload.id)) {
    return extra.map(item => item.id === payload.id ? { ...item, ...payload } : item)
  } else {
    return [...extra, payload]
  }
}

export const calculateDiscretionary = (payload) => {
  const { collection, metadata } = payload

  const remainingFor = (item) => {
    const { amount, expense, monthly, spent, transaction_count } = item
    if (monthly) {
      return transaction_count === 0 ? amount : 0
    } else {
      const difference = amount - spent
      return expense ? Math.min(difference, 0) : Math.max(difference, 0)
    }
  }

  return metadata.balance + collection.reduce((acc, item) => acc += remainingFor(item), 0)
}
