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
  console.log(state);
  switch(action.type) {
    case('TOGGLE_DEVMENU'):
      return Object.assign({}, state, { menuOpen: !state.menuOpen, openItems: [] });
      break;
    case('CLOSE_DEVMENU'):
      return Object.assign({}, state, { menuOpen: false, openItems: [] });
      break;
    case('TOGGLE_DEVMENU_ITEM'):
      let newOpenItems = [];

      if(state.openItems.indexOf(action.index) == -1)
        newOpenItems = state.openItems.concat([action.index]);
      else
        newOpenItems = state.openItems.filter(x => x != action.index);

      return Object.assign({}, state, { openItems: newOpenItems });
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
