import React from "react"

import { NavLink } from "react-router-dom"

import { terms } from "../locales/terms"

export default () => (
  <header>
    <h1>{terms.appName}</h1>
    <NavLink to="/accounts">
      <div className="tab">
        <h2>{terms.accounts}</h2>
      </div>
    </NavLink>
    <NavLink to="/budget">
      <div className="tab">
        <h2>{terms.budget}</h2>
      </div>
    </NavLink>
  </header>
)
