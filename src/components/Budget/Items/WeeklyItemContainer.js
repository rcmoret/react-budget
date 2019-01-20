import React from "react"
import Amount from './Amount'
import Caret from '../Shared/Caret'
import Icon from '../../Icons/Icon'
import WeeklyDetail from './WeeklyDetail'

const WeeklyItemContainer = (props) => (
  <div className='budget-item'>
    <div className="budget-item-detail">
      <div className='budget-item-description'>
        <div className="caret">
          <Caret
            showDetail={props.showDetail}
            expandDetail={props.expandDetail}
            collapseDetail={props.collapseDetail}
          />
        </div>
        {props.name}
        &nbsp;
        <Icon className={props.iconClassName} />
      </div>
      <div className='budget-item-amount'>
        <Amount
         expandDetail={props.expandDetail}
         updateParent={props.updateParent}
         absolute={true}
         {...props}
        />
      </div>
    </div>
    <WeeklyDetail {...props} />
  </div>
)

export default WeeklyItemContainer
