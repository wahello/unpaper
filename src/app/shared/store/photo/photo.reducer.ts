import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Photo } from './photo.model';
import { PhotoActions, PhotoActionTypes } from './photo.actions';

export interface State extends EntityState<Photo> {
  isLoading: boolean;
}

export const adapter: EntityAdapter<Photo> = createEntityAdapter<Photo>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
});

export function reducer(state = initialState, action: PhotoActions): State {
  switch (action.type) {
    // case PhotoActionTypes.AddPhoto: {
    //   return adapter.addOne(action.payload.photo, state);
    // }

    // case PhotoActionTypes.UpsertPhoto: {
    //   return adapter.upsertOne(action.payload.photo, state);
    // }

    case PhotoActionTypes.LoadPhotos: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case PhotoActionTypes.AddPhotos: {
      return {
        ...adapter.addMany(action.payload.photos, state),
        isLoading: false,
      };
    }

    // case PhotoActionTypes.UpsertPhotos: {
    //   return adapter.upsertMany(action.payload.photos, state);
    // }

    // case PhotoActionTypes.UpdatePhoto: {
    //   return adapter.updateOne(action.payload.photo, state);
    // }

    // case PhotoActionTypes.UpdatePhotos: {
    //   return adapter.updateMany(action.payload.photos, state);
    // }

    // case PhotoActionTypes.DeletePhoto: {
    //   return adapter.removeOne(action.payload.id, state);
    // }

    // case PhotoActionTypes.DeletePhotos: {
    //   return adapter.removeMany(action.payload.ids, state);
    // }

    // case PhotoActionTypes.LoadPhotos: {
    //   return adapter.addAll(action.payload.photos, state);
    // }

    case PhotoActionTypes.ClearPhotos: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
