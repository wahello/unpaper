import { Injectable } from '@angular/core';
import { observable, action } from 'mobx';

import { ApiService } from '../services/api.service';
import { IpcService } from '../services/ipc.service';

import { SET_WALLPAPER } from '../../../ipc-channels';

export interface IPhoto {
  id: string;
}

export class Photo {
  @observable public isProcessing = false;

  constructor(public info: IPhoto, private ipc: IpcService) {}

  @action
  public setWallpaper() {
    this.isProcessing = true;
    this.ipc.sendMessage(SET_WALLPAPER, this.info).subscribe(
      () => {
        this.isProcessing = false;
      },
      () => {
        this.isProcessing = false;
      },
    );
  }
}

@Injectable()
export class PhotosStore {
  @observable public isLoading = false;
  @observable public photos: Array<Photo> = [];

  constructor(private api: ApiService, private ipc: IpcService) {}

  @action
  public addRandomPhotos() {
    this.isLoading = true;

    this.api.getRandomPhoto().subscribe(
      photos => {
        this.photos = photos.map(photo => new Photo(photo, this.ipc));
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      },
    );
  }
}
