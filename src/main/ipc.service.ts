import { Component } from '@nestjs/common';
import { ipcMain } from 'electron';

import { WallpaperService } from './wallpaper.service';
import { GET_RANDOM_PHOTO } from '../ipc-channels';
import { UnsplashService } from './unspalsh.service';

@Component()
export class IpcService {
  constructor(private wallpaper: WallpaperService, private unsplash: UnsplashService) {
    this.onGetRandomPhoto();
  }

  public onGetRandomPhoto() {
    ipcMain.on(GET_RANDOM_PHOTO, async (event: Electron.Event) => {
      const path = await this.unsplash.getRandomPhoto();
      const path2 = await this.unsplash.downloadImage(path.data.urls.full, path.data.id, __dirname);
      await this.wallpaper.setWallpaper(path2);
      event.sender.send(`${GET_RANDOM_PHOTO}:reply`, { value: path2 });
      event.sender.send(`${GET_RANDOM_PHOTO}:reply`, { done: true });
    });
  }
}
