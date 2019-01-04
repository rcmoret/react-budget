import React, { Component } from 'react';

class Icon extends Component {
  constructor(props) {
    super(props)
    this.state = {...props}
  }

  render() {
    if (this.state.icon_class_name === null) {
      return (<span></span>)
    } else {
      return (
        <span>
          <i className={this.state.className}></i>
        </span>
      )
    }
  }
}

export default Icon;
