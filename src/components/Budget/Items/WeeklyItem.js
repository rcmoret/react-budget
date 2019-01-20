import React, { Component } from "react"
import WeeklyItemContainer from "./WeeklyItemContainer"

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
      <WeeklyItemContainer
        expandDetail={this.expandDetail}
        collapseDetail={this.collapseDetail}
        updateParent={this.updateParent}
        {...this.state}
      />
    )
  }
}

export default WeeklyItem;
