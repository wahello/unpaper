import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { PhotoActionTypes, AddPhotos, ClearPhotos, SetPhotoSuccess } from './photo.actions';
import { ApiService } from '../../services/api.service';
import { IpcService } from '../../services/ipc.service';
import { SET_WALLPAPER } from '../../../../ipc-channels';
console.log(SET_WALLPAPER);

@Injectable()
export class PhotoEffects {
  @Effect()
  public loadPhotos$ = this.actions$.pipe(
    ofType(PhotoActionTypes.LoadPhotos),
    switchMap(() => this.api.getRandomPhoto()),
    switchMap((photos: any) => [new ClearPhotos(), new AddPhotos({ photos })]),
  );

  @Effect()
  public setPhotos$ = this.actions$.pipe(
    ofType(PhotoActionTypes.SetPhoto),
    map((action: any) => action.payload),
    switchMap(photo => this.ipc.sendMessage(SET_WALLPAPER, photo)),
    map((data: any) => new SetPhotoSuccess(data)),
  );

  constructor(private actions$: Actions, private api: ApiService, private ipc: IpcService) {}
}
