import { Component, OnModuleInit } from '@nestjs/common';
import { autoUpdater } from 'electron-updater';
// import { Notification } from 'electron';
// import * as notifier from 'node-notifier';

autoUpdater.on('checking-for-update', () => {
  console.log('checking-for-update');
});
autoUpdater.on('update-available', () => {
  console.log('update-available');
});
autoUpdater.on('update-not-available', () => {
  console.log('update-not-available');
});
autoUpdater.on('error', () => {
  console.log('error');
});
autoUpdater.on('download-progress', () => {
  console.log('download-progress');
});
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});
@Component()
export class UpdateService implements OnModuleInit {
  public onModuleInit() {
    autoUpdater.checkForUpdatesAndNotify();
    // notifier.notify(
    //   {
    //     title: 'Udates avai',
    //     message: 'tetetet',
    //     // closeLabel: 'close',
    //     // actions: 'update',
    //     // type: 'info',
    //     // closeLabel: 'Later',
    //     // actions: 'Ok',
    //     // reply: true,
    //   },
    //   console.log,
    // );
    // notifier.on('click', console.log);
    // this.onGetRandomPhoto();
  }
}
