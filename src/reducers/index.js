import { combineReducers } from 'redux';

import ChartsReducer from './charts.js';
import NavbarReducer from './navbar.js';
import DevicesReducer from './devices.js';
import HandsReducer from './hands.js';

const ui = combineReducers({
    charts: ChartsReducer,
    navbar: NavbarReducer,
    hands: HandsReducer
});


const reducer = combineReducers({
    devices: DevicesReducer,
    ui
});

export default reducer;
