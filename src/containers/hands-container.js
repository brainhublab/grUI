import { connect } from 'react-redux';

import Hands from '../components/hands.js';

const mapStateToProps = state => ({
    hands: state.ui.hands
});

const mapDispatchToProps = () => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hands);
