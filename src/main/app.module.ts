import { Module } from '@nestjs/common';

import { WallpaperService } from './services/wallpaper.service';
import { UpdateService } from './services/update.service';
import { ViewService } from './services/view.service';
import { IpcService } from './services/ipc.service';
import { AppComponent } from './app.component';

@Module({
  components: [AppComponent, ViewService, IpcService, WallpaperService, UpdateService],
})
export class AppModule {}
