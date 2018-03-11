import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppStoreModule } from './shared/store/app-store.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CardComponent } from './card/card.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, CardComponent],
  imports: [BrowserModule, SharedModule, AppRoutingModule, AppStoreModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
