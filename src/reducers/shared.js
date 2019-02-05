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
