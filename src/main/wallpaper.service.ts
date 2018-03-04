import { Component } from '@nestjs/common';
import * as wallpaper from 'wallpaper';

@Component()
export class WallpaperService {
  public setWallpaper(path: string) {
    return wallpaper.set(path, { scale: 'fill' });
  }
}
