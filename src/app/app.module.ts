import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RsvpManagerComponent } from './components/rsvp-manager/rsvp-manager.component';
import { RsvpService } from './services/rsvp.service';
import { LoggerService } from './services/logger.service';


@NgModule({
  declarations: [
    RsvpManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    RsvpService,
    LoggerService
  ],
  bootstrap: [RsvpManagerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { } 