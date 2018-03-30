import React from 'react'


const SidenavToggle = ({ onClick }) => (
  <ul className="navbar-nav sidenav-toggler">
    <li className="nav-item">
      <a className="nav-link text-center" id="sidenavToggler" onClick={ onClick }>
        <i className="fa fa-fw fa-angle-left"></i>
      </a>
    </li>
  </ul>
);

export default SidenavToggle
