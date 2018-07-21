import { connect } from 'react-redux'

import DevMenu from '../components/devmenu.js'
import { toggleDevmenu, clickDevmenuItem, closeDevmenu } from '../actions'

const mapStateToProps = state => ({
  menu: state.ui.navbar.topbar.devmenu,
  items: state.devices
});

const mapDispatchToProps = dispatch => ({
  handleDropdownToggle: () => dispatch(toggleDevmenu()),
  handleDropdownItemClick: (index) => dispatch(clickDevmenuItem(index)),
  handleBlur: (index) => dispatch(closeDevmenu(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DevMenu)
