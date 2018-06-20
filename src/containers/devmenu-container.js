import { connect } from 'react-redux'

import DevMenu from '../components/devmenu.js'
import { toggleDevmenu, toggleDevmenuItem, toggleDevConnect, closeDevmenu } from '../actions'

const mapStateToProps = state => ({
  menu: state.ui.navbar.topbar.devmenu,
  items: state.devices
});

const mapDispatchToProps = dispatch => ({
  handleDropdownToggle: () => dispatch(toggleDevmenu()),
  handleDropdownItemToggle: (index) => dispatch(toggleDevmenuItem(index)),
  handleBlur: (index) => dispatch(closeDevmenu(index)),
  handleConnect: (id) => dispatch(toggleDevConnect(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevMenu)
