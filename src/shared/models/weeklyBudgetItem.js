export default (attributes) => {
  const { amount, expense, days_remaining, spent, total_days } = attributes
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
