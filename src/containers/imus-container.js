
import { connect } from 'react-redux'

import Acc from '../components/acc.js'
import { addData } from '../actions'

const getpagecharts = (state) => {
  let charts = {}

  for(var i in state.ui.charts['raw']) {
    if (state.devices.hasOwnProperty(i)) {
      charts[i] = state.ui.charts['raw'][i]['smallCharts']
    }
  }

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
  colClass: 'col col-md-12 col-lg-6'
});

const mapDispatchToProps = dispatch => ({
  handleClick: (chartIndex) => (() => dispatch(addData(chartIndex)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Acc)
