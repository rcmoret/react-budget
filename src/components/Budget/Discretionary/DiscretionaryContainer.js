import React from 'react'
import Amount from './Amount'
import Caret from './../Shared/Caret'
import DiscretionaryDetail from './DiscretionaryDetail'
import Icon from '../../Icons/Icon'

const DiscretionaryContainer = (props) => (
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
        <Icon className='fa fa-money-bill-alt' />
      </div>
      <div className='budget-item-amount'>
        <Amount {...props} />
      </div>
    </div>
    <DiscretionaryDetail {...props} />
  </div>
)

export default DiscretionaryContainer
