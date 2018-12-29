import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to='/accounts'>
          <h2>Accounts</h2>
        </Link>
        <Link to='/budget'>
          <h2>Budget</h2>
        </Link>
      </div>
    );
  }
}

export default Header;
