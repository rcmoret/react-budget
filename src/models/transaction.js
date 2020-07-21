export default (transaction, formOverrides = {}) => {
  const {  budget_exclusion, check_number, details, notes } = transaction
  const amount = details.reduce((sum, detail) => sum + detail.amount, 0)
  const showBudgetExclusion = !!budget_exclusion
  const showCheck = check_number !== "" && check_number !== null
  const showNotes = notes !== "" && notes !== null
  const formOptions = {
    ...defaultFormOptions,
    showBudgetExclusion: showBudgetExclusion,
    showCheck: showCheck,
    showNotes: showNotes,
    ...formOverrides,
  }

  return {
    ...transaction,
    amount: amount,
    details: details.map(detail => ({...detail, _id: detail.id })),
    formOptions: formOptions,
  }
}

export const defaultFormOptions = {
  showBudgetExclusion: false,
  showCheck: false,
  showNotes: false,
  showReceipt: false,
}
