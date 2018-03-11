import { Component, OnModuleInit } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as wallpaper from 'wallpaper';
import * as path from 'path';
import * as fs from 'fs';

@Component()
export class WallpaperService implements OnModuleInit {
  private axios: AxiosInstance;

  public onModuleInit() {
    this.axios = axios.create({
      baseURL: process.env.UNSPLASH_URL,
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
      },
    });
  }

  public setWallpaper(path: string) {
    return wallpaper.set(path, { scale: 'fill' });
  }

  public downloadImage(url: string, name: string, folder: string) {
    return new Promise<string>((resolve, reject) => {
      const filePath = path.join(folder, `${name}.jpg`);
      const writableStream = fs.createWriteStream(filePath);

      this.axios(url, { responseType: 'stream' })
        .then(response => response.data.pipe(writableStream))
        .catch(reject);

      writableStream.on('close', () => resolve(filePath));
      writableStream.on('error', reject);
    });
  }
}
