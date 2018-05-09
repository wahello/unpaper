import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronService } from 'ngx-electron';

import { Photo } from '../shared/store/photo.store';

@Component({
  selector: 'unpaper-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() public photo: Photo;

  constructor(private sanitizer: DomSanitizer, private electron: ElectronService) {}

  public sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  public setImageHandler() {
    this.photo.setWallpaper();
  }

  public openExternal(url: string) {
    this.electron.shell.openExternal(url);
  }
}
