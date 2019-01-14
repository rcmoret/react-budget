import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Caret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.showDetail) {
      return (
        <Link
          to="#"
          className="fas fa-caret-down"
          onClick={this.state.collapseDetail}
        />
      )
    } else {
      return (
        <Link
          to="#"
          className="fas fa-caret-right"
          onClick={this.state.expandDetail}
        />
      )
    }
  }
}

export default Caret;
