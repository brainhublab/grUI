import { connect } from 'react-redux'

import Topbar from '../components/topbar.js'
import { toggleDropdown, toggleDropdownItem, toggleDevConnect, closeDropdown, addDevice, removeDevice } from '../actions'

const mapStateToProps = state => ({
  topbar: state.ui.navbar.topbar,
  menuItems: state.devices
});

const mapDispatchToProps = dispatch => ({
  handleDropdownToggle: (index) => dispatch(toggleDropdown(index)),
  handleDropdownItemToggle: (menuId, index) => dispatch(toggleDropdownItem(menuId, index)),
  handleBlur: (index) => dispatch(closeDropdown(index)),
  handleAutoConnect: (menuId, index) => dispatch(toggleAutoConnect(menuId, index)),
  handleConnect: (menuId, index) => dispatch(toggleDevConnect(menuId, index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar)
