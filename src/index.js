import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import { ipcRenderer } from 'electron'

import BootstrapCSS from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminCSS from './styles/dashboard.css'
import FontAwesomeCSS from './styles/font-awesome.min.css'
import Style from './styles/style.css'

import reducer from './reducers'
import initialState from './store/storeinit.js'
import AppContainer from './containers/app-container.js'
import { addData, addRotData, addDevice, removeDevice } from './actions'


const store = createStore(
  reducer, initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// ipc to main to start socket transfer
ipcRenderer.on('STREAM_DATA', (event, data) => {
  if (data.status == 'OK' && data.data) {
    store.dispatch(addData(data.arg, data.data));
  }
});

ipcRenderer.on('STREAM_ROTATIONS_DATA', (event, data) => {
  if (data.status == 'OK' && data.data) {
    store.dispatch(addRotData(data.data));
  }
});

ipcRenderer.send('STREAM_DATA', 'palm')
ipcRenderer.send('STREAM_DATA', 'thumb')
ipcRenderer.send('STREAM_DATA', 'index')
ipcRenderer.send('STREAM_DATA', 'middle')
ipcRenderer.send('STREAM_DATA', 'ring')
ipcRenderer.send('STREAM_DATA', 'pinky')
ipcRenderer.send('STREAM_ROTATIONS_DATA')

ReactDom.render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
