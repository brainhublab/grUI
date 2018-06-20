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

export const addData = (chartIndex) => ({
  type: 'ADD_DATA',
  chartIndex,
});

export const addDevice = (dev) => ({
  type: 'ADD_DEVICE',
  dev
});

export const removeDevice = (id) => ({
  type: 'REMOVE_DEVICE',
  id
});

export const toggleDevmenuItem = (index) => ({
  type: 'TOGGLE_DEVMENU_ITEM',
  index
});

export const toggleDevConnect = (id) => ({
  type: 'TOGGLE_DEV_CONNECT',
  id
});
