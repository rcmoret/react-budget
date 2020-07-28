import MoneyFormatter from "./MoneyFormatter"

const EventMessageBuilder = (options = {}) => eventMapper(options.eventType, options)

const eventMapper = (eventType, options) => {
  switch(eventType) {
  case "account-create":
    return accountCreate
  case "account-delete":
    return accountDelete(options)
  case "account-update":
    return accountUpdate(options)
  case "budget-category-create":
    return budgetCategoryCreate
  case "budget-category-delete":
    return budgetCategoryDelete(options)
  case "budget-category-maturity-interval-create":
    return budgetCategoryMaturityIntervalCreate
  case "budget-category-maturity-interval-delete":
    return budgetCategoryMaturityIntervalDelete(options)
  case "budget-category-update":
    return budgetCategoryUpdate(options)
  case "budget-item-create":
    return budgetItemCreate
  case "budget-item-delete":
    return budgetItemDelete(options)
  case "budget-item-update":
    return budgetItemUpdate(options)
  case "icon-create":
    return iconCreate
  case "icon-delete":
    return iconDelete(options)
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
  case "transaction-entry-create":
    return transactionEntryCreate(options)
  case "transaction-entry-delete":
    return transactionEntryDelete(options)
  case "transaction-entry-update":
    return transactionEntryUpdate(options)
  case "transfer-create":
    return transferCreate(options)
  case "transfer-delete":
    return transferDelete(options)
  default:
    throw new Error(`unknown/unmapped event type ${eventType}`)
  }
}

const accountCreate = ({ id, name, cash_flow, priority }) =>
  `account created (id: ${id}) "${name}" cash flow is ${cash_flow}, priority: ${priority}`

const accountDelete = ({ id, name }) => () => `account (id: ${id}) "${name}" deleted`

const accountUpdate = ({ id, name, changedProps }) =>
  () => `account (id: ${id}, name: "${name}") updated: ${changedStrings(changedProps).join(", and ")}`

const budgetCategoryCreate = ({ id, accrual, default_amount, expense, name }) => {
  let message = `budget category (id: ${id}) "${name} created `
  message += `with default amount ${default_amount} ${expense ? "expense" : "revenue"} ${accrual ? "and is an accural" : ""}`
  return message
}

const budgetCategoryDelete = ({ id, name }) => () => `budget category (id: ${id}, name: "${name}") deleted`

const budgetCategoryUpdate = ({ id, name, changedProps }) =>
  () => `budget category (id: ${id}, name: "${name}") updated: ${changedStrings(changedProps).join(", and ")}`

const budgetCategoryMaturityIntervalCreate = ({ id, budget_category_id, month, year }) =>
  `maturity interval (id: ${id}) for budget category id: ${budget_category_id} ${month}/${year} created`

const budgetCategoryMaturityIntervalDelete = ({ categoryId, month, year }) =>
  () => `maturity interval for budget category id: ${categoryId} ${month}/${year} deleted`

const budgetItemCreate = ({ id, amount, name, month, year }) =>
  `budget item (id: ${id})  created for ${name} (${month}/${year}), amount: ${MoneyFormatter(amount)}`

const budgetItemDelete = ({ id, category, month, year }) =>
  () => `budget item (id: ${id}) for ${category} (${month}/${year}) was deleted`

const budgetItemUpdate = ({ id, category, month, year, originalAmount, newAmount }) =>
  () => `budget item (id: ${id}) for ${category} (${month}/${year}) was adjusted from ${MoneyFormatter(originalAmount * 100)} to ${MoneyFormatter(newAmount * 100)}`

const iconCreate = ({ id, name, class_name }) => `icon created (id: ${id}) name: ${name}, class-name: ${class_name} created`

const iconDelete = () => ({ id, name }) => `icon (id: ${id}, name: "${name}") deleted`

const iconUpdate = ({ id, changedProps }) => () => `icon (id: ${id}) updated: ${changedStrings(changedProps).join(", and ")}`

const intervalClosed = ({ closeOutCompletedAt, month, year })  =>
  () => `interval: ${month}/${year} marked closed at ${closeOutCompletedAt}`

const intervalMarkComplete = ({ month, set_up_completed_at, year }) =>
  () => `interval: ${month}/${year} set up marked complete at ${set_up_completed_at}`

const maturityIntervalUpdate = ({ id, changedProps, name }) =>
  () => `maturity interval (id: ${id}, category: "${name}") updated: ${changedStrings(changedProps).join(", and ")}`

const transactionDetailDelete = ({ id, amount, budgetCategory, budgetItemId, entryId }) =>
  () => `transaction detail (id: ${id}) for entry (id: ${entryId}) removed. Amount was: ${amount}, belonging to budget item ${budgetItemId} (${budgetCategory})`

const detailTemplate = ({ id, amount, budget_category }) => `(${id}): budget category: ${budget_category}, amount: ${MoneyFormatter(amount)}`

const transactionEntryDelete = ({ id, details }) => () => `transaction entry (id: ${id}) deleted. Details: ${details.map(detailTemplate).join("; ")}`

const transactionEntryCreate = ({ accountName }) =>
  ({ id, description, details }) =>
    `transaction entry (id: ${id}) created for ${accountName} ${description || ""}. Details: ${details.map(detailTemplate).join("; ")}`

const transactionEntryUpdate = ({ id, changedProps, details }) => (
  () => {
    let message = `transaction entry (id: ${id}) was updated: ${changedStrings(changedProps).join(", and ")}`
    message += details.reduce((array, detail) => {
      if (Object.keys(detail.changedProps).length === 0) {
        return array
      } else {
        return [...array, ` detail (id: ${detail.id}) updated: ${changedStrings(detail.changedProps)}.`]
      }
    }, []).join(" And")
    return message
  }
)

const transferCreate = ({ fromAccount, toAccount, amount }) =>
  ({ id }) => `transfer (id: ${id}) created from: ${fromAccount} to: ${toAccount} amount: ${MoneyFormatter(amount)}`

const transferDelete = ({ id, amount, fromAccountId, toAccountId }) =>
  () => `transfer (id: ${id}) deleted. From account: ${fromAccountId}, to account: ${toAccountId}, amount: ${amount}`

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
