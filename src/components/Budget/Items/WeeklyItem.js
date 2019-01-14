import React, { Component } from 'react'
import Amount from './Amount'
import Caret from './Caret'
import Icon from '../../Icons/Icon'
import WeeklyDetail from './WeeklyDetail'

class WeeklyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.expandDetail = this.expandDetail.bind(this)
    this.collapseDetail = this.collapseDetail.bind(this)
  }

  expandDetail(ev) {
    this.setState({ showDetail: true })
  }

  collapseDetail(ev) {
    this.setState({ showDetail: false })
  }

  render() {
    return (
      <div className='budget-item'>
        <div className="budget-item-detail">
          <div className='budget-item-description'>
            <div className="caret">
              <Caret
                {...this.state}
                expandDetail={this.expandDetail}
                collapseDetail={this.collapseDetail}
              />
            </div>
            {this.state.name}
            &nbsp;
            <Icon className={this.state.icon_class_name} />
          </div>
          <div className='budget-item-amount'>
            <Amount {...this.state} absolute={true} />
          </div>
        </div>
        <WeeklyDetail {...this.state} />
      </div>
    );
  }
}

export default WeeklyItem;
