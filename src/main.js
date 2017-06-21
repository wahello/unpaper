import { app, BrowserWindow } from 'electron';
import wallpaper from './wallpaper';
import path from 'path';

let mainWindow = null;

function createWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.openDevTools()

  mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', () => {
  createWindow();
  wallpaper();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
