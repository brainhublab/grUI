import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ipcRenderer } from 'electron'

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

// setInterval(() => store.dispatch(addData('palm', '1,2,3 4,5,6 7,8,9')), 100);
// setInterval(() => store.dispatch(addData('index', '1,2,3 4,5,6 7,8,9')), 100);

// ipc to main to start socket transfer
ipcRenderer.on('STREAM_DATA', (event, data) => {
  console.log(data)
  if (data.status == 'OK' && data.data) {
    store.dispatch(addData(data.arg, data.data));
  }
});

ipcRenderer.send('STREAM_DATA', 'palm')
ipcRenderer.send('STREAM_DATA', 'thumb')
ipcRenderer.send('STREAM_DATA', 'index')
ipcRenderer.send('STREAM_DATA', 'middle')
ipcRenderer.send('STREAM_DATA', 'ring')
ipcRenderer.send('STREAM_DATA', 'pinky')

ReactDom.render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
