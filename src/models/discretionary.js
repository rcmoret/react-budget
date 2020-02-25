export default (payload, collection) => {
  const { balance, spent } = payload

  const remainingBudgeted = collection.reduce((acc, item) => {
    return acc += item.remaining
  }, 0)
  const overUnderBudgetAmount = collection.reduce((acc, item) => {
    return acc += item.overUnderBudgetAmount
  }, 0)
  const total_remaining = balance + remainingBudgeted
  const amount = total_remaining - overUnderBudgetAmount - spent

  return {
    collection: [],
    ...payload,
    total_remaining: total_remaining,
    amount: amount,
    overUnderBudgetAmount: overUnderBudgetAmount,
  }
}
