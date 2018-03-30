import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import BootstrapCSS from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminCSS from './styles/dashboard.css'
import FontAwesomeCSS from './styles/font-awesome.min.css'
import Style from './styles/style.css'

import reducer from './reducers'
import initialState from './store/storeinit.js'
import AppContainer from './containers/app-container.js'
import { addData, addDevice } from './actions'


const store = createStore(
  reducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// setInterval(() => store.dispatch(addData(0)), 100);
// setInterval(() => store.dispatch(addData(1)), 100);

store.dispatch(addDevice(0, {name: 'GR[L]', info: 'dev address', expanded: true, connected: true}));
store.dispatch(addDevice(0, {name: 'GR[R]', info: 'dev address', expanded: false, connected: false}));


ReactDom.render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
