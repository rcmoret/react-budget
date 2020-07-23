const EventMessageBuilder = (options = {}) => {
  return eventMapper(options.eventType, options)
}

const eventMapper = (eventType, options) => {
  switch(eventType) {
  case "account-update":
    return accountUpdate(options)
  case "budget-category-update":
    return budgetCategoryUpdate(options)
  case "budget-item-update":
    return budgetItemUpdate(options)
  case "icon-update":
    return iconUpdate(options)
  case "interval-closed":
    return intervalClosed(options)
  case "interval-mark-complete":
    return intervalMarkComplete(options)
  case "maturity-interval-update":
    return maturityIntervalUpdate(options)
  case "transaction-detail-delete":
    return transactionDetailDelete(options)
  case "transaction-entry-update":
    return transactionEntryUpdate(options)
  default:
    throw new Error(`unknown/unmapped event type ${eventType}`)
  }
}

const accountUpdate = options => {
  const { id, name, changedProps } = options
  return `account (id: ${id}, name: "${name}") updated: ${changedStrings(changedProps).join(", and ")}`
}

const budgetCategoryUpdate = options => {
  const { id, name, changedProps } = options
  return `budget category (id: ${id}, name: "${name}") updated: ${changedStrings(changedProps).join(", and ")}`
}

const budgetItemUpdate = options => {
  const { id, category, month, year, originalAmount, newAmount } = options
  return `budget item (id: ${id}) for ${category} (${month}/${year}) was adjusted from ${originalAmount} to ${newAmount}`
}

const iconUpdate = options => {
  const { id, changedProps } = options
  return `icon (id: ${id}) updated: ${changedStrings(changedProps).join(", and ")}`
}

const intervalClosed = options => (
  `interval: ${options.month}/${options.year} marked closed at ${options.closeOutCompletedAt}`
)

const intervalMarkComplete = options => (
  `interval: ${options.month}/${options.year} set up marked complete at ${options.set_up_completed_at}`
)

const maturityIntervalUpdate = options => {
  const { id, changedProps, name } = options
  return `maturity interval (id: ${id}, category: "${name}") updated: ${changedStrings(changedProps).join(", and ")}`
}

const transactionDetailDelete = options => {
  const { id, amount, budgetCategory, budgetItemId, entryId } = options
  return `transaction detail (id: ${id}) for entry (id: ${entryId}) removed. ` +
    `amount was: ${amount}, belonging to budget item ${budgetItemId} (${budgetCategory})`
}

const transactionEntryUpdate = options => {
  const { id, changedProps, details } = options
  let message = `transaction entry (id: ${id}) was updated: ${changedStrings(changedProps).join(", and ")}`
  message += details.map(detail =>
    `. detail (id: ${detail.id}) updated: ${changedStrings(detail.changedProps)}`
  ).join(", and  ")
  return message
}

const changedStrings = changedProps => (
  Object.keys(changedProps).map(key =>
    `${key.toUpperCase()} was changed from ${changedProps[key].originalValue} to ${changedProps[key].updatedValue}`
  )
)

export const changedProps = (props, updatedProps) => (
  Object.keys(updatedProps).reduce((object, key) => {
    if (props[key] === updatedProps[key]) {
      return object
    } else {
      const tuple = { originalValue: props[key], updatedValue: updatedProps[key] }
      return { ...object, [key]: tuple }
    }
  }, {})
)

export default EventMessageBuilder
