import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { environment } from '../../../environments/environment';
import { reducers, metaReducers } from './root.reducer';
import { PhotoEffects } from './photo/photo.effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forRoot([PhotoEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [],
})
export class AppStoreModule {}
