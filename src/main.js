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
};
var streamCache = {
  'raw': {},
};

ipcMain.on('STREAM_DATA', (event, arg) => {
  // destroy old socket if it exists
  if (streamSockets.raw.hasOwnProperty(arg) && streamSockets.raw[arg].socket instanceof net.Socket) {
    streamSockets.raw[arg].socket.destroy()
    streamSockets.raw[arg].socket = null
  } else if (!streamSockets.raw.hasOwnProperty(arg)) {
    streamSockets.raw[arg] = {
      socket: null,
      uuid: '',
    };
  }

  if (streamCache.raw.hasOwnProperty(arg)) {
    if (streamCache.raw[arg].hasOwnProperty('timer')) {
      clearInterval(streamCache.raw[arg].timer);
    }
  } else {
    streamCache.raw[arg] = {}
  }

  streamCache.raw[arg].cache = [];
  streamCache.raw[arg].timer = setInterval(() => {
    if (streamCache.raw[arg].cache.length != 0) {
      const data = streamCache.raw[arg].cache.map((arr) => {
        return arr.slice();
      });
      console.log('CACHE', data);
      event.sender.send('STREAM_DATA', {arg: arg, status: 'OK', data: data});
      streamCache.raw[arg].cache = [];
    }
  }, 100);

  streamSockets.raw[arg].socket = net.createConnection(sAddress, () => {
    streamSockets.raw[arg].socket.on('data', (data) => {
      var sData = data.toString();

      var arr = [];

      for (var i=0; i<18; i+=2) {
        var result;

        var sign = data[i] & (1 << 7);
        var x = (((data[i] & 0xFF) << 8) | (data[i+1] & 0xFF));

        if (sign) {
          result = 0xFFFF0000 | x;  // fill in most significant bits with 1's
        } else {
          result = x;
        }
        arr.push(result);
      }

      if (sData.startsWith('OK')) {
        event.sender.send('STREAM_DATA', {arg: arg, status: 'OK', data: null});
        const parts = sData.split(' ');
        if (parts.length > 1) {
          streamSockets.raw[arg].uuid = parts[1];
        }
      } else if (sData.startsWith('KO')) {
        event.sender.send('STREAM_DATA', {arg: arg, status: 'KO', data: sData});
      } else {
        streamCache.raw[arg].cache.push(arr);
      }
    });

    if (streamSockets.raw[arg].uuid === '') {
      streamSockets.raw[arg].socket.write('STREAM_DATA ' + arg + ' bitearray ' + streamSockets.raw[arg].uuid);
    } else {
      streamSockets.raw[arg].socket.write('STREAM_DATA ' + arg + ' bitearray');
    }
  });

  streamSockets.raw[arg].socket.on('error', (err) => {
    console.log('error: ', err)
    event.sender.send('STREAM_DATA', {arg: arg, status: 'KO', data: err})
    streamSockets.raw[arg].socket = null
  })

  streamSockets.raw[arg].socket.on('close', (hadError) => {
    if (!hadError) {
      event.sender.send('STREAM_DATA', {arg: arg, status: 'KO', data: 'Connection closed'})
    }
    streamSockets.raw[arg].socket = null
  })
})

ipcMain.on('STREAM_ROTATIONS_DATA', (event) => {
  if (streamSockets.rotations !== null && streamSockets.rotations.socket instanceof net.Socket) {
    streamSockets.rotations.socket.destroy()
    streamSockets.rotations.socket = null
  } else if (streamSockets.rotations === null) {
    streamSockets.rotations = {
      socket: null,
      uuid: '',
    };
  }

  streamSockets.rotations.socket = net.createConnection(sAddress, () => {
    streamSockets.rotations.socket.on('data', (data) => {
      var sData = data.toString();

      if (sData.startsWith('OK')) {
        event.sender.send('STREAM_ROTATIONS_DATA', {status: 'OK', data: null});
        const parts = sData.split(' ');
        if (parts.length > 1) {
          streamSockets.rotations.uuid = parts[1];
        }
      } else if (sData.startsWith('KO')) {
        event.sender.send('STREAM_ROTATIONS_DATA', {status: 'KO', data: sData});
      } else {
        event.sender.send('STREAM_ROTATIONS_DATA', {status: 'OK', data: sData});
      }
    })

    if (streamSockets.rotations.uuid !== '') {
      streamSockets.rotations.socket.write('STREAM_ROTATIONS_DATA ' + streamSockets.rotations.uuid);
    } else {
      streamSockets.rotations.socket.write('STREAM_ROTATIONS_DATA');
    }
  })

  streamSockets.rotations.socket.on('error', (err) => {
    event.sender.send('STREAM_ROTATIONS_DATA', {status: 'KO', data: err});
    streamSockets.rotations.socket = null;
  })

  streamSockets.rotations.socket.on('close', (hadError) => {
    if (!hadError) {
      event.sender.send('STREAM_ROTATIONS_DATA', {status: 'KO', data: 'Connection closed'});
    }
    streamSockets.rotations.socket = null;
  })
})
