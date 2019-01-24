export const fetchedTransactions = (response) => {
  return { type: 'transactions/FETCHED', payload: response }
}
