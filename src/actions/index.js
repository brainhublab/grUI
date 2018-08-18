export const toggleSidenav = () => ({
  type: 'TOGGLE_SIDENAV'
});

export const toggleNavbar = () => ({
  type: 'TOGGLE_NAVBAR'
});

export const toggleDevmenu = () => ({
  type: 'TOGGLE_DEVMENU'
});

export const closeDevmenu = () => ({
  type: 'CLOSE_DEVMENU'
});

export const addData = (chartIndex, data) => ({
  type: 'ADD_DATA',
  chartIndex,
  data,
});

export const addRotData = (data) => ({
  type: 'ADD_ROTATIONS_DATA',
  data
});

export const addDevice = (dev) => ({
  type: 'ADD_DEVICE',
  dev
});

export const removeDevice = (id) => ({
  type: 'REMOVE_DEVICE',
  id
});

export const clickDevmenuItem = (index) => ({
  type: 'CLICK_DEVMENU_ITEM',
  index
});
