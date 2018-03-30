import { connect } from 'react-redux'

import Acc from '../components/acc.js'
import { addData } from '../actions'

const mapStateToProps = state => ({
  charts: state.charts
});

const mapDispatchToProps = dispatch => ({
  handleClick: (chartIndex) => (() => dispatch(addData(chartIndex)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Acc)
