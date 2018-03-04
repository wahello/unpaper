import { Component } from '@nestjs/common';
import { screen } from 'electron';
import Unsplash, { toJson } from 'unsplash-js';
import * as wallpaper from 'wallpaper';
import request from 'request';
import * as fs from 'fs';
import * as path from 'path';

@Component()
export class WallpaperService {
  private unsplash: Unsplash;

  constructor() {
    this.unsplash = new Unsplash({ applicationId: 'cf2490a94f8eee61bc9fdce89fe09521a0ec14ef593924d780c3c77b79af08df' });
  }

  public async use() {
    try {
      const unsplashResponse = await this.getRandomImage();
      const imagePath = await this.downloadImage(unsplashResponse.urls.full, unsplashResponse.id);
      await this.setWallpaper(imagePath);
    } catch (error) {
      console.log(error);
    }
  }

  private getScreenSize() {
    const { height, width } = screen.getPrimaryDisplay().size;
    if (width > height) {
      return {
        orientation: 'landscape',
        width,
      };
    } else if (width === height) {
      return {
        orientation: 'squarish',
        width,
      };
    }
    return {
      orientation: 'portrait',
      width,
    };
  }

  private downloadImage(url, name) {
    return new Promise<string>((resolve, reject) => {
      const filePath = path.join(__dirname, `${name}.jpg`);
      const writableStream = fs.createWriteStream(filePath);
      request(url)
        .pipe(writableStream)
        .once('error', reject);

      writableStream.on('close', () => {
        resolve(filePath);
      });
      writableStream.on('error', reject);
    });
  }

  private getRandomImage() {
    return this.unsplash.photos
      .getRandomPhoto({
        orientation: this.getScreenSize().orientation,
        width: this.getScreenSize().width * 2,
        fm: 'jpg',
      })
      .then(toJson);
  }

  private setWallpaper(path: string) {
    return wallpaper.set(path, {
      scale: 'fill',
    });
  }
}
