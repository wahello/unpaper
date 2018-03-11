import { Component, OnModuleInit } from '@nestjs/common';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

@Component()
export class AppComponent implements OnModuleInit {
  public async onModuleInit() {
    await installExtension(REDUX_DEVTOOLS);
  }
}
