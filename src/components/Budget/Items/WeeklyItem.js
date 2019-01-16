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
    this.updateParent = this.updateParent.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  expandDetail(ev) {
    this.setState({ showDetail: true })
  }

  collapseDetail(ev) {
    this.setState({ showDetail: false })
  }

  updateParent(newState) {
    this.setState(newState)
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
            <Amount
             expandDetail={this.expandDetail}
             updateParent={this.updateParent}
             absolute={true}
             {...this.state}
            />
          </div>
        </div>
        <WeeklyDetail {...this.state} />
      </div>
    );
  }
}

export default WeeklyItem;
