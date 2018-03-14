import { Component, OnModuleInit } from '@nestjs/common';
import { autoUpdater } from 'electron-updater';
import * as notifier from 'node-notifier';

@Component()
export class UpdateService implements OnModuleInit {
  constructor() {
    autoUpdater.on('error', (error: Error) => {
      notifier.notify({
        title: error.name,
        message: error.message,
      });
    });

    autoUpdater.on('update-downloaded', () => {
      notifier.notify({
        title: 'install new updated?',
        message: 'click to install',
        wait: true,
      });

      notifier.on('click', () => setImmediate(() => autoUpdater.quitAndInstall()));
    });
  }

  public onModuleInit() {
    autoUpdater.checkForUpdatesAndNotify();
  }
}
