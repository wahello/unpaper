import { NestFactory } from '@nestjs/core';
import { app } from 'electron';

import { AppModule } from './app.module';

require('electron-unhandled')();

app.once('ready', async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
});
