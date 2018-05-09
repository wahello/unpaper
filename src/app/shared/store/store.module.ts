import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MobxAngularModule } from 'mobx-angular';

import { PhotosStore } from './photo.store';

@NgModule({
  imports: [CommonModule, MobxAngularModule],
  exports: [MobxAngularModule],
  providers: [PhotosStore],
})
export class StoreModule {}
