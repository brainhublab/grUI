import React from 'react'
import { ipcRenderer } from 'electron'

const reconnect = () => {
  ipcRenderer.send('STREAM_DATA', 'palm')
  ipcRenderer.send('STREAM_DATA', 'thumb')
  ipcRenderer.send('STREAM_DATA', 'index')
  ipcRenderer.send('STREAM_DATA', 'middle')
  ipcRenderer.send('STREAM_DATA', 'ring')
  ipcRenderer.send('STREAM_DATA', 'pinky')
  ipcRenderer.send('STREAM_ROTATIONS_DATA')
}

const ReconnectBtnContainer = () => (
  <button className="btn btn-primary" onClick={() => reconnect()}>Reconnect</button>
);

export default ReconnectBtnContainer
