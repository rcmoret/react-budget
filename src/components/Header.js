import React from 'react';
import { NavLink } from 'react-router-dom';

const today = new Date()
const month = today.getMonth() + 1
const year = today.getFullYear()

export default () => (
  <header>
    <h1>Checkbook &amp; Budget</h1>
    <NavLink to='/accounts'>
      <div className='tab'>
        <h2>Accounts</h2>
      </div>
    </NavLink>
    <NavLink to={`/budget/${month}/${year}`}>
      <div className='tab'>
        <h2>Budget</h2>
      </div>
    </NavLink>
  </header>
)
