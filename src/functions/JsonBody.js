export default (model, { payload }) => {
  switch(model) {
  case "account":
    return bodyForAccount(payload)
  case "budgetCategory":
    return bodyForCategory(payload)
  case "transaction":
    return bodyForTransaction(payload)
  case "transfer":
    return bodyForTransfer(payload)
  default:
    return JSON.stringify(payload)
  }
}

const bodyForAccount = (account) => (
  JSON.stringify({
    cash_flow: account.cashFlow,
    ...account
  })
)

const bodyForCategory = (category) => (
  JSON.stringify({
    default_amount: category.defaultAmount,
    ...category
  })
)

const bodyForTransaction = (payload) => (payload)
const bodyForTransfer = (payload) => (payload)
