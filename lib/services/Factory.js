const {remote: {BrowserWindow}} = require('electron');

export function newWindow(){
  var win = new BrowserWindow({width: 800, height: 600, show: false});
  win.on('closed', ()=>{win = null});
  win.loadURL(document.location.href);
  win.webContents.openDevTools();
  return win;
}