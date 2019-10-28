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
  const floatAmount = attributes.floatAmount || parseFloat(attributes.amount / 100.0).toFixed(2)
  const difference = amount - spent
  const remaining = expense ? Math.min(difference, 0) : Math.max(difference, 0)
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = overUnderBudget ? (-1 * difference) : 0
  const matureAccrual = accrual && (maturityMonth === month && maturityYear === year)

  return {
    collection: [],
    ...attributes,
    spent: spent,
    transactionCount: transactionCount,
    floatAmount: floatAmount,
    remaining: remaining,
    difference: difference,
    overUnderBudget: overUnderBudget,
    overUnderBudgetAmount: overUnderBudgetAmount,
    matureAccrual: matureAccrual,
  }
}
