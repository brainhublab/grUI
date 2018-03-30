import { connect } from 'react-redux'

import Home from '../components/home.js'
import { addData } from '../actions'

const mapStateToProps = state => ({
  acc: state.acc,
  gyro: state.gyro
});

const mapDispatchToProps = dispatch => ({
  handleClick: (chart) => (() => dispatch(addData(chart)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
