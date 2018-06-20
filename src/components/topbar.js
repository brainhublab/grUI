import React from 'react'
import enchanceWithClickOutside from 'react-click-outside'

import DevMenuContainer from '../containers/devmenu-container.js'

const Topbar = ({topbar, menuItems, handleDropdownToggle, handleDropdownItemToggle, handleBlur, handleAutoConnect, handleConnect}) => (
  <ul className="navbar-nav ml-auto">
    <DevMenuContainer />
  </ul>
);

export default Topbar
