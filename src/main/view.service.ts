import { Component } from '@nestjs/common';
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

const isDevelopment = process.env.NODE_ENV !== 'production';

@Component()
export class ViewService {
  private mainWindow: BrowserWindow | null = null;

  constructor() {
    this.mainWindow = this.createMainWindow();

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (this.mainWindow === null) {
        this.mainWindow = this.createMainWindow();
      }
    });
  }

  private createMainWindow() {
    const window = new BrowserWindow({
      show: false,
    });

    if (isDevelopment) {
      window.webContents.openDevTools();
      window.loadURL(`http://localhost:4200`);
    } else {
      window.loadURL(
        formatUrl({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file',
          slashes: true,
        }),
      );
    }

    window.once('closed', () => {
      this.mainWindow = null;
    });

    window.once('ready-to-show', () => {
      window.show();
    });

    window.webContents.on('devtools-opened', () => {
      window.focus();
      setImmediate(() => {
        window.focus();
      });
    });

    return window;
  }
}
