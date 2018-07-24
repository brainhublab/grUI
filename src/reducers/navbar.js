import { combineReducers } from 'redux'

const navbarToggled = (state=false, action) => {
  switch(action.type) {
    case('TOGGLE_NAVBAR'):
      return !state;
      break;
    default:
      return state;
  }
};

const sidenavToggled = (state=false, action) => {
  switch(action.type) {
    case('TOGGLE_SIDENAV'):
      return !state;
      break;
    default:
      return state;;
  }
};

const devmenu = (state=[], action) => {
  switch(action.type) {
    case('TOGGLE_DEVMENU'):
      return Object.assign({}, state, { menuOpen: !state.menuOpen, openItems: [] });
      break;
    case('CLOSE_DEVMENU'):
      return Object.assign({}, state, { menuOpen: false, openItems: [] });
      break;
    case('CLICK_DEVMENU_ITEM'):
      return Object.assign({}, state, { currentIMU: action.index });
      break;
    default:
      return state;
  }
}

const topbar = combineReducers({
  devmenu
});

const NavbarReducer = combineReducers({
  navbarToggled,
  sidenavToggled,
  topbar
});

export default NavbarReducer
