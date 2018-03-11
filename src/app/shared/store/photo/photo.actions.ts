import { Action } from '@ngrx/store';
// import { Update } from '@ngrx/entity';

import { Photo } from './photo.model';

export enum PhotoActionTypes {
  LoadPhotos = '[Photo] Load Photos',
  // AddPhoto = '[Photo] Add Photo',
  SetPhoto = '[Photo] Set Photo',
  SetPhotoSuccess = '[Photo] Set Photo Success',
  // UpsertPhoto = '[Photo] Upsert Photo',
  AddPhotos = '[Photo] Add Photos',
  // UpsertPhotos = '[Photo] Upsert Photos',
  // UpdatePhoto = '[Photo] Update Photo',
  // UpdatePhotos = '[Photo] Update Photos',
  // DeletePhoto = '[Photo] Delete Photo',
  // DeletePhotos = '[Photo] Delete Photos',
  ClearPhotos = '[Photo] Clear Photos',
}

export class LoadPhotos implements Action {
  readonly type = PhotoActionTypes.LoadPhotos;
}

// export class AddPhoto implements Action {
//   readonly type = PhotoActionTypes.AddPhoto;

//   constructor(public payload: { photo: Photo }) {}
// }

export class SetPhoto implements Action {
  readonly type = PhotoActionTypes.SetPhoto;

  constructor(public payload: { photo: Photo }) {}
}

export class SetPhotoSuccess implements Action {
  readonly type = PhotoActionTypes.SetPhotoSuccess;

  constructor(public payload: { data: any }) {}
}

// export class UpsertPhoto implements Action {
//   readonly type = PhotoActionTypes.UpsertPhoto;

//   constructor(public payload: { photo: Update<Photo> }) {}
// }

export class AddPhotos implements Action {
  readonly type = PhotoActionTypes.AddPhotos;

  constructor(public payload: { photos: Photo[] }) {}
}

// export class UpsertPhotos implements Action {
//   readonly type = PhotoActionTypes.UpsertPhotos;

//   constructor(public payload: { photos: Update<Photo>[] }) {}
// }

// export class UpdatePhoto implements Action {
//   readonly type = PhotoActionTypes.UpdatePhoto;

//   constructor(public payload: { photo: Update<Photo> }) {}
// }

// export class UpdatePhotos implements Action {
//   readonly type = PhotoActionTypes.UpdatePhotos;

//   constructor(public payload: { photos: Update<Photo>[] }) {}
// }

// export class DeletePhoto implements Action {
//   readonly type = PhotoActionTypes.DeletePhoto;

//   constructor(public payload: { id: string }) {}
// }

// export class DeletePhotos implements Action {
//   readonly type = PhotoActionTypes.DeletePhotos;

//   constructor(public payload: { ids: string[] }) {}
// }

export class ClearPhotos implements Action {
  readonly type = PhotoActionTypes.ClearPhotos;
}

export type PhotoActions = LoadPhotos | AddPhotos | SetPhoto | SetPhotoSuccess | ClearPhotos;
// | UpsertPhoto
// | AddPhotos
// | UpsertPhotos
// | UpdatePhoto
// | UpdatePhotos
// | DeletePhoto
// | DeletePhotos
// | ClearPhotos;
