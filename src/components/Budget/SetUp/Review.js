import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { editReviewItem, finishReview } from "../../../actions/budget/setup"
import { Link } from "react-router-dom"

import Icon from "../../Icons/Icon"

const Review = ({ collection, dispatch, month, year }) => {
  const reviewCount = collection.filter(item => !item.reviewed).length

  return (
    <div className="set-up-review">
      {collection.map(item =>
        <ReviewItem
          key={item.id}
          dispatch={dispatch}
          item={item}
          month={month}
          year={year}
        />
      )}
      <FinishReview dispatch={dispatch} reviewCount={reviewCount} />
    </div>
  )
}

const ReviewItem = ({ dispatch, item, month, year}) => {
  const handleChange = (e) => {
    const action = editReviewItem({ id: item.id, floatAmount: e.target.value, reviewed: false })
    dispatch(action)
  }

  const floatAmount = item.floatAmount || (item.amount / 100.0).toFixed(2)

  return (
    <div className="review-item">
      <div className="review-item-label">
        <label>{item.name}</label>
      </div>
      <div className="review-item-input">
        <input value={floatAmount} onChange={handleChange} />
      </div>
      <CheckMark
        dispatch={dispatch}
        item={item}
        month={month}
        reviewed={item.reviewed}
        year={year}
      />
    </div>
  )
}

const CheckMark = ({ dispatch, item, month, reviewed, year }) => {
  const confirmReviewed = (e) => {
    e.preventDefault()
    const { id, budget_category_id, floatAmount } = item
    if (floatAmount) {
      const url =  ApiUrlBuilder(["budget", "categories", budget_category_id, "items", id], { month: month, year: year })
      fetch(url, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Math.round(100 * parseFloat(floatAmount)) })
      })
        .then(response => response.json())
        .then(data => dispatch(editReviewItem({ ...data, reviewed: true, floatAmount: null })))
    } else {
      const action = editReviewItem({ id: id, reviewed: true })
      dispatch(action)
    }
  }

  if (reviewed) {
    return (
      <span className="green-text">
        <Icon className="fas fa-check-circle" />
      </span>
    )
  } else {
    return (
      <span className="review-button">
        <Link
          to="#"
          onClick={confirmReviewed}
          className="far fa-check-circle"
        />
      </span>
    )
  }
}

const FinishReview = ({ dispatch, reviewCount }) => {
  const onClick = (e) => {
    e.preventDefault()
    const action = finishReview()
    dispatch(action)
  }

  if (reviewCount === 0) {
    return (
      <div className="finish-review-button">
        <button
          onClick={onClick}
        >
          Finish Review
        </button>
      </div>
    )
  } else {
    return null
  }
}

export default connect((_state, ownProps) => ownProps)(Review)
