import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { allPhotosSelector } from '../shared/store/photo/photo.selectors';
import { SetPhoto } from '../shared/store/photo/photo.actions';
import { State } from '../shared/store/root.reducer';

@Component({
  selector: 'unpaper-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  public photos$ = this.store.select(allPhotosSelector);

  constructor(private store: Store<State>) {}

  public onSetImage(event) {
    this.store.dispatch(new SetPhoto(event));
  }
}
