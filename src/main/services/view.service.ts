import * as positioner from 'electron-traywindow-positioner';
import { BrowserWindow, Tray, Menu } from 'electron';
import { Component } from '@nestjs/common';
import { format as formatUrl } from 'url';
import * as path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

@Component()
export class ViewService {
  public mainWindow: BrowserWindow | null = null;
  public tray: Tray | null = null;

  constructor() {
    this.mainWindow = this.createMainWindow();
    this.tray = this.createTray();
  }

  public toggleWindow() {
    if (this.mainWindow) {
      if (this.mainWindow.isVisible()) {
        this.mainWindow.hide();
      } else {
        this.showWindow();
      }
    }
  }

  public showWindow() {
    if (this.mainWindow && this.tray) {
      const position = positioner.calculate(this.mainWindow.getBounds(), this.tray.getBounds());

      this.mainWindow.setPosition(position.x, position.y, false);
      this.mainWindow.show();
      this.mainWindow.focus();
    }
  }

  public createMainWindow() {
    const window = new BrowserWindow({
      show: false,
      width: 700,
      height: 451,
      useContentSize: true,
      frame: false,
      fullscreenable: false,
      movable: false,
      titleBarStyle: 'customButtonsOnHover',
      resizable: isDevelopment,
      alwaysOnTop: isDevelopment,
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

    window.on('show', () => {
      if (this.tray) this.tray.setHighlightMode('always');
    });

    window.on('hide', () => {
      if (this.tray) this.tray.setHighlightMode('never');
    });

    window.on('blur', () => {
      if (!isDevelopment) window.hide();
    });

    // window.once('ready-to-show', () => {
    //   // this.show();
    // });

    window.webContents.on('devtools-opened', () => {
      window.focus();
      setImmediate(() => window.focus());
    });

    return window;
  }

  public createTray() {
    const tray = new Tray(path.join(__static, 'sunTemplate.png'));
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Settings', type: 'normal', accelerator: 'CommandOrControl+,' },
      { type: 'separator' },
      { label: 'Quit', role: 'quit', accelerator: 'CommandOrControl+Q' },
    ]);

    tray.on('click', () => this.toggleWindow());
    tray.on('right-click', () => {
      if (this.mainWindow && this.mainWindow.isVisible) this.mainWindow.hide();
      tray.popUpContextMenu(contextMenu);
    });

    tray.setToolTip('Unpaper');

    return tray;
  }
}
