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
  const transaction_count = attributes.transaction_count || 0
  const difference = amount - spent
  const deletable = transaction_count === 0
  const remaining = deletable ? amount : 0
  const overUnderBudget = (expense && difference > 0) || (!expense && difference < 0)
  const overUnderBudgetAmount = overUnderBudget ? (-1 * difference) : 0
  const matureAccrual = accrual && (maturity_month === month && maturity_year === year)

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
