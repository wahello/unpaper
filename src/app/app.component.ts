import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from './shared/store/root.reducer';
import { LoadPhotos, SetPhoto } from './shared/store/photo/photo.actions';
import { allPhotosSelector } from './shared/store/photo/photo.selectors';

@Component({
  selector: 'unpaper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public photos$ = this.store.select(allPhotosSelector);

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.store.dispatch(new LoadPhotos());
  }

  public onClick() {
    this.store.dispatch(new LoadPhotos());
  }

  public onSetImage(event) {
    this.store.dispatch(new SetPhoto(event));
  }
}
