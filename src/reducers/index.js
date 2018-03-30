import { combineReducers } from 'redux'

import ChartsReducer from './charts.js'
import NavbarReducer from './navbar.js'

const reducer = combineReducers({
  navbar: NavbarReducer,
  charts: ChartsReducer
});

export default reducer
