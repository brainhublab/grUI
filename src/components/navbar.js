import React from 'react'
import { Link } from 'react-router-dom'

import Sidenav from './sidenav.js'
import SidenavToggle from './sidenavtoggle.js'
import NavbarToggle from './navbar-toggle.js'
import TopbarContainer from '../containers/topbar-container.js'


const Navbar = ({ navbarToggled, handleSidenavToggle, handleNavbarToggle }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <Link to="/" className="navbar-brand" tabIndex="0">GR</Link>
    <NavbarToggle onClick={ handleNavbarToggle }/>
    <div className={'navbar-collapse collapse ' + (navbarToggled ? 'show' : null)} id="navbarResponsive" >
      <Sidenav />
      <SidenavToggle onClick={ handleSidenavToggle } />
      <TopbarContainer />
    </div>
  </nav>
)

export default Navbar
