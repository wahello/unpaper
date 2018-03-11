import { adapter, State } from './photo.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const { selectEntities, selectAll } = adapter.getSelectors();

export const photoFeature = createFeatureSelector<State>('photos');
export const allPhotosSelector = createSelector(photoFeature, selectAll);
