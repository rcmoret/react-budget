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
      return (
        <span></span>
      )
    } else if (this.state.showDetail) {
      return (
        <Link className='fas fa-angle-down' to='#' onClick={this.state.collapseDetail} />
      )
    } else {
      return (
        <Link className='fas fa-angle-right' to='#' onClick={this.state.expandDetail} />
      )
    }
  }
}

export default LeftIcon;
