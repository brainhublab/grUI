import { connect } from 'react-redux'

import Topbar from '../components/topbar.js'
import { toggleDropdown, toggleDropdownItem, toggleDevConnect, closeDropdown, addDevice, removeDevice } from '../actions'

const mapStateToProps = state => ({
  topbar: state.ui.navbar.topbar,
  menuItems: state.devices
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topbar)
