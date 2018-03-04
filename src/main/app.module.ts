import { Module } from '@nestjs/common';

import { AppComponent } from './app.component';
import { ViewService } from './view.service';
import { IpcService } from './ipc.service';
import { WallpaperService } from './wallpaper.service';
import { UnsplashService } from './unspalsh.service';

@Module({
  components: [AppComponent, ViewService, IpcService, WallpaperService, UnsplashService],
})
export class AppModule {}
