import React, { Component } from 'react'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'
import DiscretionaryContainer from "./DiscretionaryContainer"

class Discretionary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'spending cache',
      remaining: 0,
      showDetail: false,
    }
    this.expandDetail = this.expandDetail.bind(this)
    this.collapseDetail = this.collapseDetail.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder(['budget', 'discretionary']))
      .then(response => response.json())
      .then(data => this.setState({
        ...data
        })
     )
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

  render() {
    return (
      <DiscretionaryContainer
        {...this.state}
        expandDetail={this.expandDetail}
        collapseDetail={this.collapseDetail}
      />
    )
  }
}

export default Discretionary;
