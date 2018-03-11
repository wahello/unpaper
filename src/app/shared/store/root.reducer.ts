import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import * as formPhoto from './photo/photo.reducer';

export interface State {
  photos: formPhoto.State;
}

export const reducers: ActionReducerMap<State> = {
  photos: formPhoto.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
