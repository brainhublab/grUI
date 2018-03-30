import React from 'react';
import { NavLink } from 'react-router-dom'

const NavItem = (text, icon, path) => (
  <li className="nav-item" title="">
    <NavLink to={path} className="nav-link" activeClassName="nav-link-active">
      <i className={'fa fa-fw ' + icon}></i>
      <span className="nav-link-text">{text}</span>
    </NavLink>
  </li>
)

const Sidenav = () => (
  <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
    {NavItem('Raw Data', 'fa-microchip', '/raw_data')}
    {NavItem('Trajectory', 'fa-bullseye', '/trajectory')}
    {NavItem('Orientation', 'fa-arrows', '/orientation')}
  </ul>
)

export default Sidenav
