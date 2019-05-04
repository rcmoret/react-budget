export const editReviewItem = (updatedItem, collection) => {
  return collection.map(item =>
    item.id !== updatedItem.id ? item : { ...item, ...updatedItem }
  )
}
