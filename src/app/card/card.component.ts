import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'unpaper-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() public photo;
  @Output() public setImage = new EventEmitter();

  constructor(
    private sanitizer: DomSanitizer,
    private electron: ElectronService,
  ) {}

  public sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  public setImageHandler() {
    this.setImage.emit(this.photo);
  }

  public openExternal(url: string) {
    this.electron.shell.openExternal(url);
  }
}
