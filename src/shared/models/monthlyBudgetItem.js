export default (attributes) => {
  const { amount, expense, spent, transaction_count } = attributes
  const difference = amount - spent
  const deletable = transaction_count === 0
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
