import { Component, OnModuleInit } from '@nestjs/common';
import { app, BrowserWindow, Tray } from 'electron';
import { format as formatUrl } from 'url';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

@Component()
export class ViewService implements OnModuleInit {
  public mainWindow: BrowserWindow | null = null;
  public tray: Tray | null = null;

  public onModuleInit() {
    this.mainWindow = this.createMainWindow();
    this.tray = this.createTray();

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

  public toggle() {
    if (this.mainWindow) {
      if (this.mainWindow.isVisible()) {
        this.mainWindow.hide();
      } else {
        this.show();
      }
    }
  }

  public show() {
    if (this.mainWindow) {
      const position = this.getWindowPosition();
      if (position) {
        this.mainWindow.setPosition(position.x, position.y, false);
      }
      this.mainWindow.show();
      this.mainWindow.focus();
    }
  }

  public getWindowPosition() {
    if (this.mainWindow && this.tray) {
      const windowBounds = this.mainWindow.getBounds();
      const trayBounds = this.tray.getBounds();

      const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
      const y = Math.round(trayBounds.y + trayBounds.height + 4);
      return { x: x, y: y };
    }
  }

  private createMainWindow() {
    const window = new BrowserWindow({
      show: false,
      width: 700,
      height: 500,
      useContentSize: true,
      frame: false,
      fullscreenable: false,
      transparent: true,
      resizable: isDevelopment,
      webPreferences: {
        backgroundThrottling: false,
      },
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
      // this.show();
    });

    window.webContents.on('devtools-opened', () => {
      window.focus();
      setImmediate(() => {
        window.focus();
      });
    });

    return window;
  }

  private createTray() {
    const tray = new Tray(path.join(__static, 'sunTemplate.png'));

    tray.on('click', this.toggle.bind(this));
    // tray.on('right-click', this.view.toggle.bind(this.view));
    // tray.on('double-click', this.view.toggle.bind(this.view));

    return tray;
  }
}
