import { Component } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { screen } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

@Component()
export class UnsplashService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.UNSPLASH_URL,
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
      },
    });
  }

  public getRandomPhoto() {
    return this.axios('photos/random', {
      params: {
        fm: 'jpg',
        ...this.getScreenSize(),
      },
    });
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

  private getScreenSize() {
    const { height, width } = screen.getPrimaryDisplay().size;
    if (width > height) {
      return { orientation: 'landscape', w: width };
    } else if (width === height) {
      return { orientation: 'squarish', w: width };
    }
    return { orientation: 'portrait', h: height };
  }
}
