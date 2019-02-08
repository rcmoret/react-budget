export default (attributes) => {
  const { amount, deletable, expense, spent } = attributes
  const difference = amount - spent
  const remaining = deletable ? amount : 0
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = overUnderBudget ? (-1 * difference) : 0

  return ({
    ...attributes,
    remaining: remaining,
    difference: difference,
    overUnderBudget: overUnderBudget,
    overUnderBudgetAmount: overUnderBudgetAmount,
  })
}
