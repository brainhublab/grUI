import { connect } from 'react-redux'

import Acc from '../components/acc.js'
import { addData } from '../actions'

const getpagecharts = (state) => {
  let charts = {}

  for(var i in state.ui.charts) {
    charts[i] = state.ui.charts[i]['raw_data']
  }

  return charts
}

const getdevnames = (state) => {
  let devNames = {}

  for(var i in state.devices) {
    devNames[i] = state.devices[i].name
  }

  return devNames
}

const mapStateToProps = state => ({
  charts: getpagecharts(state),
  devNames: getdevnames(state)
});

const mapDispatchToProps = dispatch => ({
  handleClick: (chartIndex) => (() => dispatch(addData(chartIndex)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Acc)
