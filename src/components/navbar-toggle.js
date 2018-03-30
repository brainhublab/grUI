import React from 'react'


const NavbarToggle = ({ onClick }) => (
    <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={ onClick }>
      <span className="navbar-toggler-icon"></span>
    </button>
)

export default NavbarToggle
