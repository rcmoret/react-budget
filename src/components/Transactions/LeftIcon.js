import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LeftIcon extends Component {
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
    if (this.state.subtransactions.length === 0) {
      return null
    } else if (this.state.showDetail) {
      return (
        <Link className='fas fa-caret-down' to='#' onClick={this.state.collapseDetail} />
      )
    } else {
      return (
        <Link className='fas fa-caret-right' to='#' onClick={this.state.expandDetail} />
      )
    }
  }
}

export default LeftIcon;
