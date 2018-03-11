import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'unpaper-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() public photo;
  @Output() public setImage = new EventEmitter();

  public setImageHandler() {
    this.setImage.emit(this.photo);
  }
}
