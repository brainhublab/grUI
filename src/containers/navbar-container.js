import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Navbar from '../components/navbar.js'
import { toggleSidenav, toggleNavbar } from '../actions'


const mapStateToProps = state => ({
  navbarToggled: state.ui.navbar.navbarToggled
});

const mapDispatchToProps = dispatch => ({
  handleSidenavToggle: () => dispatch(toggleSidenav()),
  handleNavbarToggle: () => dispatch(toggleNavbar())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar))
