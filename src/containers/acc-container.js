import { connect } from 'react-redux'

import Acc from '../components/acc.js'
import { addData } from '../actions'

const getpagecharts = (state) => {
  let charts = {}
  let currentIMU = state.ui.navbar.topbar.devmenu.currentIMU

  charts[currentIMU] = state.ui.charts['raw'][currentIMU]['bigCharts']

  return charts
}

const getdevnames = (state) => {
  let devNames = {}

  for(var k in state.devices) {
    devNames[k] = state.devices[k]
  }

  return devNames
}

const mapStateToProps = state => ({
  charts: getpagecharts(state),
  devNames: getdevnames(state),
  colClass: 'col col-sm-12'
});

const mapDispatchToProps = dispatch => ({
  handleClick: (chartIndex) => (() => dispatch(addData(chartIndex)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Acc)
