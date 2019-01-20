import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LeftIcon = (props) => {
  if (props.subtransactions.length === 0) {
    return null
  } else if (props.showDetail) {
    return (
      <Link className='fas fa-caret-down' to='#' onClick={props.collapseDetail} />
    )
  } else {
    return (
      <Link className='fas fa-caret-right' to='#' onClick={props.expandDetail} />
    )
  }
}

export default LeftIcon;
