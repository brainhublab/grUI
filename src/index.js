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
import { addData, addDevice, removeDevice } from './actions'


const store = createStore(
  reducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// setInterval(() => store.dispatch(addData(0)), 100);
// setInterval(() => store.dispatch(addData(1)), 100);

let d = {
  name: 'GR[L]',
  address: '98:D3:31:80:91:3B',
  connected: false,
}

store.dispatch(addDevice(d));
setTimeout(() => {
  store.dispatch(removeDevice(d.address));
}, 5000);


ReactDom.render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
