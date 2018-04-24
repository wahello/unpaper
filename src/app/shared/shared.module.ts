import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxElectronModule } from 'ngx-electron';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UnsplashInterceptor } from './interceptors/unsplash.interceptor';
import { ApiService } from './services/api.service';
import { IpcService } from './services/ipc.service';
import { MaterialModule } from './modules/material.module';

@NgModule({
  imports: [CommonModule, NgxElectronModule, MaterialModule, HttpClientModule, RouterModule],
  exports: [MaterialModule],
  providers: [
    IpcService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnsplashInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
