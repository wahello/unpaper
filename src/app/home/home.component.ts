import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { PhotosStore } from '../shared/store/photo.store';

@Component({
  selector: 'unpaper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(public photosStore: PhotosStore) {}
}
