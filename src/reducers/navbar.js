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

const topbar = (state=[], action) => {
  switch(action.type) {
    case('TOGGLE_DROPDOWN'):
      return state.map((menu, index) => (
        (index === action.index)
        ? Object.assign({}, menu, {
          menuOpen: !menu.menuOpen,
          items: menu.items.map((item) => (
            Object.assign({}, item, {expanded: false})
          ))
        })
        : menu
      ));
      break;
    case('CLOSE_DROPDOWN'):
      return state.map((menu, index) => (
        (index === action.index)
        ? Object.assign({}, menu, { menuOpen: false })
        : menu
      ));
      break;
    case('ADD_DEVICE'):
      return state.map((menu, index) => {
        if(index === action.index) {
          return Object.assign({}, menu, {
            items: menu.items.findIndex((item) => item.name == action.device.name) === -1 ? menu.items.concat([action.device]) : menu.items
          });
        } else {
          return menu;
        }
      });
      break;
    case('REMOVE_DEVICE'):
      return state.map((menu, index) => {
        if(index === action.index) {
          return Object.assign({}, menu, {
            items: menu.items.filter((item) => item.name !== action.name)
          });
        } else {
          return menu;
        }
      });
      break;
    case('TOGGLE_DROPDOWN_ITEM'):
      return state.map((menu, index) => {
        if(index === action.menuId) {
          return Object.assign({}, menu, {
            items: menu.items.map((item, index) => {
              if(index === action.index) {
                return Object.assign({}, item, {
                  expanded: !item.expanded
                });
              } else {
                return item;
              }
            })
          });
        } else {
          return menu;
        }
      });
      break;
    case('TOGGLE_DEV_CONNECT'):
      return state.map((menu, index) => {
        if(index === action.menuId) {
          return Object.assign({}, menu, {
            items: menu.items.map((item, index) => {
              if(index === action.index) {
                return Object.assign({}, item, {
                  connected: !item.connected
                });
              } else {
                return item;
              }
            })
          });
        } else {
          return menu;
        }
      });
    default:
      return state;
  }
};

const NavbarReducer = combineReducers({
  navbarToggled,
  sidenavToggled,
  topbar
});

export default NavbarReducer
