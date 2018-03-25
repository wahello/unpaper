import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Store } from '@ngrx/store';

import { LoadPhotos } from './shared/store/photo/photo.actions';
import { State } from './shared/store/root.reducer';

@Component({
  selector: 'unpaper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public isAtTop = true;

  constructor(private store: Store<State>, private electron: ElectronService) {}

  public ngOnInit() {
    this.electron.webFrame.setVisualZoomLevelLimits(1, 1);
    this.electron.webFrame.setLayoutZoomLevelLimits(0, 0);

    this.store.dispatch(new LoadPhotos());
  }

  public onClick() {
    this.store.dispatch(new LoadPhotos());
  }
  public onScroll(event: Event) {
    const element: HTMLElement = event.target as any;
    element.scrollTop === 0 ? (this.isAtTop = true) : (this.isAtTop = false);
  }
}
