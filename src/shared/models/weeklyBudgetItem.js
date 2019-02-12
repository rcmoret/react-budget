export default (attributes, metadata) => {
  const { amount, expense, spent } = attributes
  const { days_remaining, total_days } = metadata
  const floatAmount = attributes.floatAmount || parseFloat(attributes.amount / 100.0).toFixed(2)
  const difference = amount - spent
  const remaining = expense ? Math.min(difference, 0) : Math.max(difference, 0)
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = overUnderBudget ? (-1 * difference) : 0
  const budgetedPerDay = Math.floor(amount / total_days)
  const budgetedPerWeek = (budgetedPerDay * 7)
  const remainingPerDay = Math.floor(remaining / days_remaining)
  const remainingPerWeek = (remainingPerDay * 7)

  return ({
    collection: [],
    ...attributes,
    floatAmount: floatAmount,
    remaining: remaining,
    difference: difference,
    overUnderBudget: overUnderBudget,
    overUnderBudgetAmount: overUnderBudgetAmount,
    budgetedPerDay: budgetedPerDay,
    budgetedPerWeek: budgetedPerWeek,
    remainingPerDay: remainingPerDay,
    remainingPerWeek: remainingPerWeek,
  })
}
