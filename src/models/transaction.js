export default (transaction, formOverrides = {}) => {
  const { notes, details } = transaction
  const amount = details.reduce((sum, detail) => sum + detail.amount, 0)
  const showNotes = notes !== "" && notes !== null

  return {
    ...transaction,
    amount: amount,
    details: details.map(detail => ({...detail, _id: detail.id })),
    formOptions: { ...defaultFormOptions, ...formOverrides, showNotes: showNotes },
  }
}

export const defaultFormOptions = {
  showBudgetExclusion: false,
  showCheck: false,
  showNotes: false,
  showReceipt: false,
}
