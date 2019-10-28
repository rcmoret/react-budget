export default (attributes) => {
  const {
    accrual,
    amount,
    expense,
    maturityMonth,
    maturityYear,
    month,
    year,
  } = attributes
  const spent = attributes.spent || 0
  const transactionCount = attributes.transactionCount || 0
  const difference = amount - spent
  const deletable = transactionCount === 0
  const remaining = deletable ? amount : 0
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = !deletable ? (-1 * difference) : 0
  const matureAccrual = accrual && maturityMonth === month && maturityYear === year

  return {
    ...attributes,
    deletable: deletable,
    remaining: remaining,
    difference: difference,
    matureAccrual: matureAccrual,
    overUnderBudget: overUnderBudget,
    overUnderBudgetAmount: overUnderBudgetAmount,
  }
}
