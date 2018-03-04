import { Component } from '@angular/core';
import { IpcService } from './shared/ipc.service';

import { GET_RANDOM_PHOTO } from '../ipc-channels';

@Component({
  selector: 'unpaper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ipc: IpcService) {
    this.ipc.sendMessage(GET_RANDOM_PHOTO).subscribe(console.log);
  }
}
