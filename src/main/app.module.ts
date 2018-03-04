import { Module } from '@nestjs/common';

import { AppComponent } from './app.component';
import { ViewService } from './view.service';
import { IpcService } from './ipc.service';

@Module({
  components: [AppComponent, ViewService, IpcService],
})
export class AppModule {}
