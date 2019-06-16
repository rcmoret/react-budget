export default (payload) => {
  if (payload.accrual) {
    return {
      maturityIntervals: [],
      ...payload,
    }
  } else {
    return payload
  }
}
