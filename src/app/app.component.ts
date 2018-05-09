import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ElectronService } from 'ngx-electron';

import { PhotosStore } from './shared/store/photo.store';

@Component({
  selector: 'unpaper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public isAtTop = true;

  constructor(private electron: ElectronService, private photosStore: PhotosStore) {}

  public ngOnInit() {
    this.electron.webFrame.setVisualZoomLevelLimits(1, 1);
    this.electron.webFrame.setLayoutZoomLevelLimits(0, 0);

    this.photosStore.addRandomPhotos();
  }

  public onClick() {
    this.photosStore.addRandomPhotos();
  }

  public onScroll(event: Event) {
    const element: HTMLElement = event.target as any;
    element.scrollTop === 0 ? (this.isAtTop = true) : (this.isAtTop = false);
  }
}
