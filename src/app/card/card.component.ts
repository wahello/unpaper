import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {}

  public sanitizeURL(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  public setImageHandler() {
    this.setImage.emit(this.photo);
  }
}
