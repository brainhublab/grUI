import React from 'react'
import enchanceWithClickOutside from 'react-click-outside'

import ReconnectBtnContainer from './reconnect-btn-container.js'
import DevMenuContainer from '../containers/devmenu-container.js'

const Topbar = ({topbar, menuItems, handleDropdownToggle, handleDropdownItemClick, handleBlur}) => (
  <ul className="navbar-nav ml-auto">
    <ReconnectBtnContainer />
    <DevMenuContainer />
  </ul>
);

export default Topbar
