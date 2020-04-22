export default (transaction, formOverrides = {}) => {
  const { details } = transaction
  const amount = details.reduce((sum, detail) => sum + detail.amount, 0)

  return {
    ...transaction,
    amount: amount,
    details: details.map(detail => ({...detail, _id: detail.id })),
    formOptions: { ...defaultFormOptions, ...formOverrides },
  }
}

export const defaultFormOptions = {
  showBudgetExclusion: false,
  showCheck: false,
  showNotes: false,
  showReceipt: false,
}
