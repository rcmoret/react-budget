export default (attributes) => {
  const { amount, expense } = attributes
  const spent = attributes.spent || 0
  const transactions_count = attributes.transactions_count || 0
  const difference = amount - spent
  const deletable = transactions_count === 0
  const remaining = deletable ? amount : 0
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = overUnderBudget ? (-1 * difference) : 0

  return ({
    ...attributes,
    deletable: deletable,
    remaining: remaining,
    difference: difference,
    overUnderBudget: overUnderBudget,
    overUnderBudgetAmount: overUnderBudgetAmount,
  })
}
