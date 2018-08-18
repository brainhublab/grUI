import { connect } from 'react-redux'

import Rotations from '../components/rotations.js'
import { addData } from '../actions'

const mapStateToProps = state => ({
  charts: [state.ui.charts.rotations],
  devNames: ['All'],
  colClass: 'col col-sm-12'
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => {}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rotations)
