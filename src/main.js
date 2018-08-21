const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const net = require('net')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // Load React devtools
  const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')

  installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))

  installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'prod') {
    const p = path.join(__dirname, '..', 'dist', 'index.html')
    win.loadURL(url.format({
      pathname: p,
      protocol: 'file:',
      slashes: true
    }))
  } else {
    win.loadURL(url.format({
      pathname: 'localhost:8081',
      protocol: 'http:',
      slashes: true
    }))
  }

  // // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var sAddress = '/tmp/grsock'
var streamSockets = {
  'raw': {},
  'rotations': null
}

ipcMain.on('STREAM_DATA', (event, arg) => {
  if (streamSockets.raw.hasOwnProperty(arg) && streamSockets.raw[arg] instanceof net.Socket) {
    streamSockets.raw[arg].destroy()
    streamSockets.raw[arg] = null
  }

  streamSockets.raw[arg] = net.createConnection(sAddress, () => {
    streamSockets.raw[arg].on('data', (data) => {
      var sData = data.toString()

      if (sData.startsWith('OK')) {
        event.sender.send('STREAM_DATA', {arg: arg, status: 'OK', data: null})
      } else if (sData.startsWith('KO')) {
        event.sender.send('STREAM_DATA', {arg: arg, status: 'KO', data: sData})
      } else {
        event.sender.send('STREAM_DATA', {arg: arg, status: 'OK', data: sData})
      }
    })

    streamSockets.raw[arg].write('STREAM_DATA ' + arg)
  })

  streamSockets.raw[arg].on('error', (err) => {
    event.sender.send('STREAM_DATA', {arg: arg, status: 'KO', data: err})
    streamSockets.raw[arg] = null
  })

  streamSockets.raw[arg].on('close', (hadError) => {
    if (!hadError) {
      event.sender.send('STREAM_DATA', {arg: arg, status: 'KO', data: 'Connection closed'})
    }
    streamSockets.raw[arg] = null
  })
})

ipcMain.on('STREAM_ROTATIONS_DATA', (event, arg) => {
  if (streamSockets.rotations instanceof net.Socket) {
    streamSockets.rotations.destroy()
    streamSockets.rotations = null
  }

  streamSockets.rotations = net.createConnection(sAddress, () => {
    streamSockets.rotations.on('data', (data) => {
      var sData = data.toString()

      console.log(sData);

      if (sData.startsWith('OK')) {
        event.sender.send('STREAM_ROTATIONS_DATA', {status: 'OK', data: null})
      } else if (sData.startsWith('KO')) {
        event.sender.send('STREAM_ROTATIONS_DATA', {status: 'KO', data: sData})
      } else {
        event.sender.send('STREAM_ROTATIONS_DATA', {status: 'OK', data: sData})
      }
    })

    streamSockets.rotations.write('STREAM_ROTATIONS_DATA')
  })

  streamSockets.rotations.on('error', (err) => {
    event.sender.send('STREAM_ROTATIONS_DATA', {status: 'KO', data: err})
    streamSockets.rotations = null
  })

  streamSockets.rotations.on('close', (hadError) => {
    if (!hadError) {
      event.sender.send('STREAM_ROTATIONS_DATA', {status: 'KO', data: 'Connection closed'})
    }
    streamSockets.rotations = null
  })
})
