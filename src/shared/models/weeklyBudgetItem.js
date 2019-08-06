export default (attributes) => {
  const {
    accrual,
    amount,
    expense,
    maturity_month,
    maturity_year,
    month,
    year,
  } = attributes
  const spent = attributes.spent || 0
  const transactions_count = attributes.transactions_count || 0
  const floatAmount = attributes.floatAmount || parseFloat(attributes.amount / 100.0).toFixed(2)
  const difference = amount - spent
  const remaining = expense ? Math.min(difference, 0) : Math.max(difference, 0)
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = overUnderBudget ? (-1 * difference) : 0
  const matureAccrual = accrual && (maturity_month === month && maturity_year === year)

  return {
    collection: [],
    ...attributes,
    spent: spent,
    transactions_count: transactions_count,
    floatAmount: floatAmount,
    remaining: remaining,
    difference: difference,
    overUnderBudget: overUnderBudget,
    overUnderBudgetAmount: overUnderBudgetAmount,
    matureAccrual: matureAccrual,
  }
}
