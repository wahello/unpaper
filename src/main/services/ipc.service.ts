import { Component, OnModuleInit } from '@nestjs/common';
import { ipcMain, app } from 'electron';

import { WallpaperService } from './wallpaper.service';
import { SET_WALLPAPER } from '../../ipc-channels';

@Component()
export class IpcService implements OnModuleInit {
  constructor(private wallpaper: WallpaperService) {}

  public onModuleInit() {
    this.onGetRandomPhoto();
  }

  public onGetRandomPhoto() {
    ipcMain.on(SET_WALLPAPER, async (event: Electron.Event, { links, id }: any) => {
      const path = await this.wallpaper.downloadImage(links.download, id, app.getPath('downloads'));
      await this.wallpaper.setWallpaper(path);

      event.sender.send(`${SET_WALLPAPER}:reply`, { value: path });
      event.sender.send(`${SET_WALLPAPER}:reply`, { done: true });
    });
  }
}
