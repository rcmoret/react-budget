import React from "react"
import { connect } from "react-redux"
import Caret from "../Shared/Caret"
import Icon from "../../Icons/Icon"
import WeeklyAmount from "./WeeklyAmount"
import WeeklyDetail from "./WeeklyDetail"
import { editWeeklyItem } from "../../../actions/budget"

const WeeklyItem = (props) => {
  const expandDetail = (e) => {
    e.preventDefault()
    props.dispatch(editWeeklyItem({ id: props.id, showDetail: true }))
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    props.dispatch(editWeeklyItem({ id: props.id, showDetail: false }))
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
          {props.name}
          { " " }
          <Icon className={props.iconClassName} />
        </div>
        <div className='budget-item-amount'>
          <WeeklyAmount
            expandDetail={expandDetail}
            absolute={true}
            {...props}
          />
        </div>
      </div>
      <WeeklyDetail {...props} />
    </div>
  )
}

export default connect((_state, ownProps) => ownProps)(WeeklyItem)
