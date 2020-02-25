export default (transaction) => {
  const { details } = transaction
  const amount = details.reduce((sum, detail) => sum + detail.amount, 0)

  return {
    ...transaction,
    amount: amount,
    details: details.map(detail => ({...detail, _id: detail.id }))
  }
}
