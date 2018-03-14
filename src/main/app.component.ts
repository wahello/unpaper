import electronDevtoolsInstaller, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { Component, OnModuleInit } from '@nestjs/common';
import { app } from 'electron';

import { ViewService } from './services/view.service';

@Component()
export class AppComponent implements OnModuleInit {
  constructor(private view: ViewService) {}

  public async onModuleInit() {
    await electronDevtoolsInstaller(REDUX_DEVTOOLS);

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (this.view.mainWindow === null) {
        this.view.mainWindow = this.view.createMainWindow();
      }
    });
  }
}
