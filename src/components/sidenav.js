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
    {NavItem('Single IMU', 'fa-microchip', '/imu')}
    {NavItem('All IMUs', 'fa-bullseye', '/imus')}
  </ul>
)

export default Sidenav
