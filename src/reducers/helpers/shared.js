export const updateItemInCollection = ({ updatedItem, collection, save }) => {
  return collection.map((item) => {
    if (item.id !== updatedItem.id) {
      return item
    } else if(save) {
      return { ...item, ...updatedItem, originalProps: null }
    } else {
      const originalProps = item.originalProps || item
      return { ...item, ...updatedItem, originalProps: originalProps }
    }
  })
}

export const update = (payload, collection) => {
  return collection.map(obj => {
    if (obj.id !== payload.id) {
      return obj
    } else {
      return { ...obj, ...payload }
    }
  })
}

export const updated = (payload, collection) => {
  return collection.map(obj => {
    if (obj.id !== payload.id) {
      return obj
    } else {
      return {
        ...obj,
        ...payload,
        updatedProps: null,
        errors: [],
      }
    }
  })
}

export const updateProps = (payload, collection) => {
  return collection.map(obj => {
    if (obj.id !== payload.id) {
      return obj
    } else {
      return {
        ...obj,
        updatedProps: {
          ...obj.updatedProps,
          ...payload
        }
      }
    }
  })
}
