export const addItem = (payload) => {
  return { type: "budget/setup/ADD_ITEM", payload: payload }
}

export const editAddNew = (payload) => {
  return { type: "budget/setup/EDIT_ADD_NEW", payload: payload }
}

export const editReviewItem = (payload) => {
  return { type: "budget/setup/EDIT_REVIEW_ITEM", payload: payload }
}

export const finishReview = (payload) => {
  return { type: "budget/setup/FINISH_REVIEW", payload: payload }
}

export const markReviewed = (payload) => {
  return { type: "budget/setup/MARK_REVIEWED", payload: payload }
}

export const nextStep = () => {
  return { type: "budget/setup/NEXT_STEP" }
}

export const requeue = (payload) => {
  return { type: "budget/setup/REQUEUE", payload: payload }
}
