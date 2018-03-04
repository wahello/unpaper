import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

import { IpcService } from './ipc.service';

@NgModule({
  imports: [CommonModule, NgxElectronModule],
  providers: [IpcService],
})
export class SharedModule {}
