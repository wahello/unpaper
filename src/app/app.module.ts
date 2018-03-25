import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppStoreModule } from './shared/store/app-store.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CardComponent } from './card/card.component';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { PopularComponent } from './popular/popular.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SidenavComponent,
    HomeComponent,
    SettingsComponent,
    AboutComponent,
    HistoryComponent,
    PopularComponent,
  ],
  imports: [BrowserModule, SharedModule, AppRoutingModule, AppStoreModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
