import { combineReducers } from 'redux'

import ChartsReducer from './charts.js'
import NavbarReducer from './navbar.js'
import DevicesReducer from './devices.js'
import s from '../store/storeinit.js'

const data = (state=s.data) => state
const devices = (state=s.devices) => state

const ui = combineReducers({
  charts: ChartsReducer,
  navbar: NavbarReducer
});


const reducer = combineReducers({
  devices: DevicesReducer,
  ui
});

export default reducer
