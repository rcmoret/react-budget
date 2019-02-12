import React from "react"
import { connect } from "react-redux"
import { toggleDiscretionaryDetail } from "../../../actions/budget"
import Amount from "./Amount"
import Caret from "./../Shared/Caret"
import DiscretionaryDetail from "./DiscretionaryDetail"
import Icon from "../../Icons/Icon"

const Discretionary = (props) => {
  const expandDetail = (e) => {
    e.preventDefault()
    props.dispatch(toggleDiscretionaryDetail({ showDetail: true }))
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    props.dispatch(toggleDiscretionaryDetail({ showDetail: false }))
  }

  return (
    <div className='budget-item'>
      <div className="budget-item-detail">
        <div className='budget-item-description'>
          <div className="caret">
            <Caret
              showDetail={props.showDetail}
              expandDetail={expandDetail}
              collapseDetail={collapseDetail}
            />
          </div>
          Discretionary
          {" "}
          <Icon className='fa fa-money-bill-alt' />
        </div>
        <div className='budget-item-amount'>
          <Amount
            amount={props.amount}
            showDetail={props.showDetail}
            total_remaining={props.total_remaining}
          />
        </div>
      </div>
      <DiscretionaryDetail {...props} />
    </div>
  )
}

export default connect(state => state.budget.discretionary)(Discretionary)
