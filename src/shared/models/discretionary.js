export default (payload, collection) => {
  const { balance, spent } = payload

  const remainingBudgeted = collection.reduce((acc, item) => {
    return acc += item.remaining
  }, 0)
  const overUnderBudgetAmount = collection.reduce((acc, item) => {
    return acc += item.overUnderBudgetAmount
  }, 0)
  const totalRemaining = balance + remainingBudgeted
  const amount = totalRemaining - overUnderBudgetAmount - spent

  return {
    collection: [],
    ...payload,
    totalRemaining: totalRemaining,
    amount: amount,
    overUnderBudgetAmount: overUnderBudgetAmount,
  }
}
