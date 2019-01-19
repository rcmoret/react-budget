import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Checkbook & Budget</h1>
    <NavLink to='/accounts'>
      <div className='tab'>
        <h2>Accounts</h2>
      </div>
    </NavLink>
    <NavLink to='/budget'>
      <div className='tab'>
        <h2>Budget</h2>
      </div>
    </NavLink>
  </header>
)

export default Header
