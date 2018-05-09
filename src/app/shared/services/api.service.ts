import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElectronService } from 'ngx-electron';

import { IPhoto } from '../store/photo.store';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private electron: ElectronService) {}

  public getRandomPhoto() {
    return this.http.get<IPhoto[]>('unsplash/photos/random', {
      params: {
        fm: 'jpg',
        count: 4,
        ...this.getScreenSize(),
      } as any,
    });
  }

  private getScreenSize() {
    const { height, width } = this.electron.screen.getPrimaryDisplay().size;
    if (width > height) {
      return { orientation: 'landscape', w: width };
    } else if (width === height) {
      return { orientation: 'squarish', w: width };
    }
    return { orientation: 'portrait', h: height };
  }
}
