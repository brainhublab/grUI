export const toggleSidenav = () => ({
  type: 'TOGGLE_SIDENAV'
});

export const toggleNavbar = () => ({
  type: 'TOGGLE_NAVBAR'
});

export const toggleDropdown = (index) => ({
  type: 'TOGGLE_DROPDOWN',
  index
});

export const closeDropdown = (index) => ({
  type: 'CLOSE_DROPDOWN',
  index
});

export const addData = (chartIndex) => ({
  type: 'ADD_DATA',
  chartIndex,
});

export const addDevice = (index, dev) => ({
  type: 'ADD_DEVICE',
  index,
  device: dev
});

export const removeDevice = (index, devName) => ({
  type: 'REMOVE_DEVICE',
  index,
  name: devName
});

export const toggleDropdownItem = (menuId, index) => ({
  type: 'TOGGLE_DROPDOWN_ITEM',
  menuId,
  index
});

export const toggleDevConnect = (menuId, index) => ({
  type: 'TOGGLE_DEV_CONNECT',
  menuId,
  index
});
