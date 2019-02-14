export default (payload, state) => {
  const monthlyItems = state.monthly
  const weeklyItems = state.weekly.collection
  const items = [...monthlyItems, ...weeklyItems]
  const remainingBudgeted = items.reduce((acc, item) => {
    return acc += item.remaining
  }, 0)
  const overUnderBudgetAmount = items.reduce((acc, item) => {
    return acc += item.overUnderBudgetAmount
  }, 0)
  const total_remaining = payload.balance + remainingBudgeted
  const amount = total_remaining + overUnderBudgetAmount - payload.spent
  const budgetedPerDay = Math.floor(amount / payload.total_days)
  const budgetedPerWeek = budgetedPerDay * 7
  const remainingPerDay = Math.floor(total_remaining / payload.days_remaining)
  const remainingPerWeek = remainingPerDay * 7

  return {
    collection: [],
    ...payload,
    total_remaining: total_remaining,
    amount: amount,
    budgetedPerDay: budgetedPerDay,
    budgetedPerWeek: budgetedPerWeek,
    remainingPerDay: remainingPerDay,
    remainingPerWeek: remainingPerWeek,
    overUnderBudgetAmount: overUnderBudgetAmount,
  }
}
