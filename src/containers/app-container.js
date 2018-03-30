import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import App from '../components/app.js'


const mapStateToProps = state => ({
  sidenavToggled: state.navbar.sidenavToggled
})

export default withRouter(connect(
  mapStateToProps
)(App))
